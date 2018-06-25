export default {
    state: {
        entered: false,
    },

    startAnimation() {
        this.state.entered = true
    	// window.alert(this.state.entered)
    },

    endAnimation() {
        this.state.entered = false
    	// window.alert(this.state.entered)
    }
}