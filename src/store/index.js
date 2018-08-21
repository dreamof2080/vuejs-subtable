import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import WorkflowBrowser_store from '../components/WorkflowBrowser_store';
import FieldBrowser_store from '../components/FieldBrowser_store';
import Global_store from '../components/Global_store';
import Form_store from '../components/FormBrowser_store'

export default new Vuex.Store({
    modules:{
      workflowStore:WorkflowBrowser_store,
      fieldStore:FieldBrowser_store,
      formStore:Form_store,
      globalStore:Global_store,
    }
  }
)