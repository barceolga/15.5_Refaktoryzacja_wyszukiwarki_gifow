var GIPHY_API_URL = 'http://api.giphy.com/';
var GIPHY_PUB_KEY = 'xNEbJNreq63SELIRSP6e0Y3N3jnasbV3';


App = React.createClass({
  //1. Sets initial state

    getInitialState() {
      return {
        loading: false,
        searchingText: '',
        gif: {}
      };
    },

  //2. This method sets state loading to true and calls getGif function.

    handleSearch: function(searchingText) {
      this.setState({
        loading: true
      });
      this.getGif(searchingText)
      .then(response =>
            this.setState({
            loading: false,
            gif: response,
            searchingText: searchingText
          })
    ).catch(error => console.error('Something went wrong', error));
    },

//.3. This method gets gif from giphy.com and returns gif object as callback

     getGif: function(searchingText) {
        const url = GIPHY_API_URL + 'v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
      return new Promise(
        function(resolve, reject) {
          const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function(){
                if (this.status === 200) {
                  var data = JSON.parse(xhr.responseText).data;
                  var gif = {
                      url: data.fixed_width_downsampled_url,
                      sourceUrl: data.url
                    };
                  resolve(gif);
                } else {
                    reject(new Error(this.statusText));
                  }
            };
            xhr.onerror = function() {
                reject(new Error(
                  `XMLHttpRequest Error: ${this.statusText}`));
            };
            xhr.send();
          });
        },


    render: function() {
      var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '90%'
      };

      return (
        <div style={styles}>
            <h1>GIFs search engine!</h1>
            <p>Find a gif on <a href='http://giphy.com'>giphy</a>. Push enter to get another gif </p>
            <Search onSearch={this.handleSearch} />
          <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl} />
        </div>
      );
    }
});
