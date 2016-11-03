var SubNavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationItem');
    return (
      <li><a href="#">{this.props.subNavigationItem}</a></li>
    );
  },
});

var SubNavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationBar');
    var subNavigationItems = ['Java','Haskell','Javascript','Ruby'].map(function(navItem, index) {
      return <SubNavigationItem key={index} subNavigationItem={navItem} />
    });
    return (
      <div id="subNavigation">
        <ul id="tabs">
          {subNavigationItems}
        </ul>
      </div>
    );
  },
});

var Browsepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Browsepage');
    return (
      <div>
        <SubNavigationBar />
      </div>
    );
  },
});

export default Browsepage;