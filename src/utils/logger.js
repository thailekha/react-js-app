var logger = {
  counter: {},
  reportRender: function(component) {
    console.log(component);
    if (this.counter[component] === undefined) {
      this.counter[component] = 1;
    }
    else {
      this.counter[component] += 1;
    }
  },
  reportCounter: function() {
    for (var i in this.counter) {
      console.log(i + ': ' + this.counter[i]);
    }
  }
};

export default logger;