import './index.less';
import { Icon, Menu, Dropdown } from 'ant-design-vue';
import ThemeSvg from './theme.svg?inline';
import themeMixin from '@/store/theme-mixin';

let ThemeIcon = {
  render() {
    return <Icon component={ThemeSvg} />;
  }
};

const SwitchTheme = {
  name: 'SwitchTheme',
  mixins: [themeMixin],
  render() {
    const switchTheme = ({ key }) => {
      this.setTheme(key);
    };

    const themeMenu = (
      <Menu
        class={['menu', 'ant-pro-switch-theme']}
        selectedKeys={[this.currentTheme]}
        onClick={switchTheme}
      >
        {this.themes.map(theme => {
          let itemStyle = {
            backgroundImage: theme.preview ? `url(${this.$baseUrl}${theme.preview})` : ''
          };
          let circularStyle = {
            backgroundImage: `url(${this.$baseUrl}${theme.circular})`
          };
          let itemCls = ['ant-pro-switch-theme-item'];
          if (theme.key === this.currentTheme) {
            itemCls.push('ant-pro-switch-theme-item-active');
            itemStyle = {
              ...itemStyle,
              backgroundImage: theme.active ? `url(${this.$baseUrl}${theme.active})` : ''
            };
          }

          return (
            <Menu.Item style={itemStyle} class={itemCls} key={theme.key}>
              <span style={circularStyle} class={['circular', `circular-${theme.key}`]}></span>
              <span>&nbsp;&nbsp;{theme.name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <Dropdown overlay={themeMenu} placement="bottomRight">
        <span class={'drop-down-theme'}>
          <ThemeIcon />
        </span>
      </Dropdown>
    );
  }
};

export default SwitchTheme;
