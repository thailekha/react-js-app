var logger = {
  counter: {},
  reportRender: function(component) {
    //console.log(component);
    if (this.counter[component] === undefined) {
      this.counter[component] = 1;
    }
    else {
      this.counter[component] += 1;
    }
  },
  reportCounter: function() {
    var report = '';
    for (var i in this.counter) {
      report += i + ': ' + this.counter[i] + '\n';
    }
    alert(report);
  },
  reset: function(){
    this.counter = {};
  }
};

export default logger;