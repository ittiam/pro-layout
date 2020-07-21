import { mapState } from 'vuex';

const themeMixin = {
  computed: {
    ...mapState({
      themes: state => state.theme.list,
      currentTheme: state => state.theme.theme
    })
  },
  methods: {
    setTheme(theme) {
      this.$store.dispatch('theme/setTheme', theme);
    }
  }
};

export default themeMixin;
