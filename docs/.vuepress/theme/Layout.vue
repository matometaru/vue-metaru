<template>
    <div class="theme-container"
      :class="pageClasses"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>
      <canvas class="bg" ref="background" id="canvas"></canvas>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
      <transition>
        <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
          <slot name="sidebar-top" slot="top"/>
          <slot name="sidebar-bottom" slot="bottom"/>
        </Sidebar>
      </transition>
      <transition>
        <div class="custom-layout" v-if="$page.frontmatter.layout">
          <component :is="$page.frontmatter.layout"/>
        </div>
        <Home v-else-if="$page.frontmatter.home"/>
        <Page v-else :sidebar-items="sidebarItems">
          <slot name="page-top" slot="top"/>
          <slot name="page-bottom" slot="bottom"/>
        </Page>
      </transition>
    </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Home from './Home.vue'
import Navbar from './Navbar.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import { resolveSidebarItems } from './util'
import indexStore from '../stores/index' // 追加
import {TweenMax, Expo, Elastic} from 'gsap' // 追加
import Bubbles from '../class/bubbles' // 追加

export default {
  components: { Home, Page, Sidebar, Navbar },
  data () {
    return {
      isSidebarOpen: false,
      store: indexStore.state,
      entered: false,
      oBubbles: "",
    }
  },

  watch: {
    entered: function () {
      this.entered ? this.enter() : this.leave()
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {
    let init = () => {
      this.oBubbles = new Bubbles();
    }
    window.onload = init;

    this.$router.beforeResolve((to, from, next) => {
      this.entered = true
      next()
    })
    this.$router.afterEach((to, from, next) => {
      setTimeout( () => {
        this.entered = false
      }, 1500);
    })

    window.addEventListener('scroll', this.onScroll)

    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
      this.isSidebarOpen = false
    })
  },

  methods: {
    enter () {
      // window.alert("遷移前のアニメーション");
      this.oBubbles.start();
    },
    leave () {
      // window.alert("遷移後のアニメーション");
      this.oBubbles.addStop();
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.styl" lang="stylus"></style>
