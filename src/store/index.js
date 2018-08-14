import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import WorkflowBrowser_store from '../components/WorkflowBrowser_store';
import FieldBrowser_store from '../components/FieldBrowser_store';
import Global_store from '../components/Global_store'

export default new Vuex.Store({
    modules:{
      workflowBrowser:WorkflowBrowser_store,
      fieldBrowser:FieldBrowser_store,
      globalStore:Global_store
    }
  }
)