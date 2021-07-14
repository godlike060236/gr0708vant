import Vue from 'vue'
import Vant, { Locale } from 'vant'
import {Toast} from 'vant';
import 'vant/lib/index.css'
import { Lazyload } from 'vant';
import '@vant/touch-emulator';

Vue.use(Lazyload);
Vue.use(Vant)
Vue.use(Toast)
