import 'core-js/stable';
import 'regenerator-runtime/runtime';
import OrgUsageDashboard from './OrgUsageDashboard.vue';

Fliplet().then(() => {
  new Vue({
    el: '#organization-dashboard',
    render: (createElement) => {
      return createElement(OrgUsageDashboard);
    }
  });
});
