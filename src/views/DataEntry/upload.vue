<template>
    <div>
        upload / switch
        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                open<br/>
                <a-switch defaultChecked checkedChildren="开" unCheckedChildren="关"/>
            </a-col>
            <a-col :span="8">
                close<br/>
                <a-switch checkedChildren="开" unCheckedChildren="关"/>
            </a-col>
            <a-col :span="8">
                disabled<br/>
                <a-switch defaultChecked checkedChildren="开" unCheckedChildren="关" :disabled="true"/>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                open<br/>
                <a-switch size="small" defaultChecked/>
            </a-col>
            <a-col :span="8">
                close<br/>
                <a-switch size="small"/>
            </a-col>
            <a-col :span="8">
                disabled<br/>
                <a-switch size="small" defaultChecked :disabled="true"/>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="6">
                <a-upload
                        name="avatar"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :beforeUpload="beforeUpload"
                        @change="handleChange4"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
                    <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'"/>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </a-col>
            <a-col :span="6">
                <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        :fileList="fileList"
                        @preview="handlePreview"
                        @change="handleChange5"
                >
                    <div v-if="fileList.length < 3">
                        <a-icon type="plus"/>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage"/>
                </a-modal>
            </a-col>
            <a-col :span="6">
                <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        :defaultFileList="fileList1"
                >
                    <a-button>
                        <a-icon type="upload"/>
                        upload
                    </a-button>
                </a-upload>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="6">
                上传<br/>
                <a-upload
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange1"
                >
                    <a-button type="primary">
                        <a-icon type="upload"/>
                        上传
                    </a-button>
                </a-upload>
            </a-col>
            <a-col :span="6">
                上传<br/>
                <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :defaultFileList="defaultFileList"
                >
                    <a-button type="primary">
                        <a-icon type="upload"/>
                        上传
                    </a-button>
                </a-upload>
            </a-col>
            <a-col :span="6">
                上传<br/>
                <a-upload-dragger
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        @change="handleChange3"
                >
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox"/>
                    </p>
                    <p class="ant-upload-text">点击或将文件拖拽到这里上传文件</p>
                    <p class="ant-upload-hint">
                        支持扩展名：.rar .zip .docx .pdf .jpg...
                    </p>
                </a-upload-dragger>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    export default {
        name: '',
        data() {
            return {
                headers: {
                    authorization: 'authorization-text'
                },
                defaultFileList: [
                    {
                        uid: '1',
                        name: 'xxx.png',
                        status: 'done',
                        response: 'Server Error 500', // custom error message to show
                        url: 'http://www.baidu.com/xxx.png'
                    },
                    {
                        uid: '2',
                        name: 'yyy.png',
                        status: 'done',
                        url: 'http://www.baidu.com/yyy.png'
                    },
                    {
                        uid: '3',
                        name: 'zzz.png',
                        status: 'error',
                        response: 'Server Error 500', // custom error message to show
                        url: 'http://www.baidu.com/zzz.png'
                    }
                ],
                loading: false,
                imageUrl: '',
                previewVisible: false,
                previewImage: '',
                fileList: [
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    }
                ],
                fileList1: [
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl:
                            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    },
                    {
                        uid: '-2',
                        name: 'yyy.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl:
                            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    }
                ]
            };
        },
        components: {},
        methods: {
            handleChange1(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            handleChange({file, fileList}) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            },
            handleChange3(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            handleChange4(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleCancel() {
                this.previewVisible = false;
            },
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true;
            },
            handleChange5({fileList}) {
                this.fileList = fileList;
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
