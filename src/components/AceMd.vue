<template>
    <div class="wrapper">
        <slot></slot>
        <div class="custom">
            <transition name="slide">
                <div class="custom-main wbgc-main wbdc" v-show="expand">
                    <div class="custom-left">
                        <div class="custom-editor" ref="editor"></div>
                        <a-button type="primary" @click="customData">{{buttonTitle}}</a-button>
                    </div>
                    <pre class="custom-right">
                        <code class="markdown" ref="doc"></code>
                    </pre>
                </div>
            </transition>
            <p class="custom-expand wbgc-dropdown wbgc-dropdown-hover" @click="e=>expand=!expand">
                <i :class="'icon-ic_keyboard_arrow_'+(expand?'down':'up')"></i>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AceMd",
        props: {
            buttonTitle: {
                type: String,
                default: '提交'
            },
            data: {
                type: Object,
                default: () => ({})
            },
            md: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                expand: true,
                editor: null
            };
        },
        watch: {
            baseTheme() {
                this.updateAceTheme();
                this.updateMdTheme();
            }
        },
        mounted() {
            this.initAce();
            this.initMd();
        },
        methods: {
            initAce() {
                const src = ['https://cdn.bootcss.com/ace/1.4.9/ace.min.js',
                    'https://cdn.bootcss.com/ace/1.4.9/ext-language_tools.min.js',
                    'https://cdn.bootcss.com/ace/1.4.9/mode-json.min.js',
                    'https://cdn.bootcss.com/ace/1.4.9/theme-chrome.min.js',
                    'https://cdn.bootcss.com/ace/1.4.9/theme-nord_dark.min.js'];
                this.loadScripts(src, () => {
                    window.ace.config.set('basePath', 'https://cdn.bootcss.com/ace/1.4.9/');
                    this.editor = window.ace.edit(this.$refs.editor);
                    this.editor.session.setMode("ace/mode/json");
                    this.editor.setOptions({
                        fontSize: 16,
                        enableBasicAutocompletion: true,
                        enableSnippets: true,
                        enableLiveAutocompletion: true
                    });
                    const defaultValut = JSON.stringify(this.data, null, 4);
                    this.editor.setValue(defaultValut);
                    this.editor.session.setValue(defaultValut);
                    this.updateAceTheme();
                });
            },
            initMd() {
                this.loadCss('https://cdn.bootcss.com/highlight.js/10.0.0/styles/googlecode.min.css', 'light');
                this.loadCss('https://cdn.bootcss.com/highlight.js/10.0.0/styles/atom-one-dark.min.css', 'dark');

                const src = ['https://cdn.bootcss.com/marked/0.8.2/marked.min.js',
                    'https://cdn.bootcss.com/highlight.js/10.0.0/highlight.min.js'];
                this.loadScripts(src, () => {
                    this.$refs.doc.innerHTML = window.marked(this.md);
                    window.hljs.highlightBlock(this.$refs.doc);
                    this.updateMdTheme();
                });
            },
            updateAceTheme() {
                if (this.baseTheme === 'dark') {
                    this.editor.setTheme('ace/theme/nord_dark');
                } else {
                    this.editor.setTheme('ace/theme/chrome');
                }
            },
            updateMdTheme() {
                const isDark = this.baseTheme === 'dark';
                Array.prototype.forEach.call(document.querySelectorAll('link'), function (el) {
                    if (el.title === 'hljs-dark') {
                        el.rel = isDark ? 'stylesheet' : 'alternate stylesheet';
                        el.disabled = !isDark;
                    } else if (el.title === 'hljs-light') {
                        el.rel = !isDark ? 'stylesheet' : 'alternate stylesheet';
                        el.disabled = isDark;
                    }
                });
            },
            loadCss(url, title) {
                let css = document.createElement('link');
                css.href = url;
                css.rel = 'alternate stylesheet';
                css.type = 'text/css';
                css.title = 'hljs-' + title;
                css.disabled = true;
                document.head.appendChild(css);
            },
            loadSingleScript(src, callback) {
                let s = document.createElement('script');
                s.async = false;
                s.src = src;
                s.addEventListener('load', function loadEvent(e) {
                    s.parentNode.removeChild(s);
                    s.removeEventListener('load', loadEvent, false);
                    callback && callback();
                }, false);
                document.body.appendChild(s);
            },
            loadScripts(list, callback) {
                let loaded = 0;
                let loadNext = () => {
                    this.loadSingleScript(list[loaded], function () {
                        loaded++;
                        if (loaded >= list.length) {
                            callback && callback();
                        } else {
                            loadNext();
                        }
                    });
                };
                loadNext();
            },
            customData() {
                try {
                    let data = JSON.parse(this.editor.getValue());
                    this.$emit('change', data);
                } catch (err) {
                    this.$message.error('JSON格式有误');
                }
            }
        }
    };
</script>

<style scoped lang="less">
    .wrapper {
        padding: 0;
    }

    .custom {
        z-index: 9;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        &-expand {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 25px;
            font-size: 30px;
            cursor: pointer;
        }

        &-main {
            display: flex;
            height: 60vh;
            padding: 10px;
            border-top: 1px solid;
        }

        &-left, &-right {
            flex: 1;
        }

        &-left {
            display: flex;
            flex-direction: column;
        }

        &-right {
            display: flex;
            margin-left: 10px;
            overflow: auto;

            /deep/ & {
                * {
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
                }

                h1, h2, h3, h4, h5 {
                    color: inherit;
                }

                hr {
                    margin: 0;
                }

                pre {
                    white-space: pre !important;
                    overflow: visible;
                }

                .markdown {
                    width: 100%;
                }
            }
        }

        &-editor {
            flex: 1;
            margin-bottom: 10px;

            /deep/ * {
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
            }
        }
    }

    .slide {
        &-enter-active, &-leave-active {
            transition: all .3s;
        }

        &-enter, &-leave-to {
            transform: translateY(100%);
        }
    }
</style>