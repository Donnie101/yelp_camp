const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

var data = [
  {
    name:'Clouds rest',
    image:'https://images.pexels.com/photos/192518/pexels-photo-192518.jpeg?h=350&auto=compress&cs=tinysrgb',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus euismod vestibulum. Praesent tempus quam blandit viverra luctus. Duis fringilla nulla a ipsum porta, id pharetra felis auctor. Suspendisse et rhoncus tellus. Integer quis congue lectus. Maecenas tortor ante, gravida at volutpat in, laoreet vel elit. Phasellus ac blandit risus. Pellentesque molestie viverra arcu in fermentum. Integer sed ante eu turpis tempor feugiat ac at erat. Integer auctor eget odio a cursus. Nulla facilisi. Nunc dictum mi vel imperdiet accumsan. Aliquam vestibulum lorem vel dolor fringilla laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur sit amet lacus sit amet libero iaculis gravida et sagittis mauris.',
    author:{username:'Jack dePussy'}
  },
  {
    name:'Watching the universe',
    image:'https://images.pexels.com/photos/27865/pexels-photo-27865.jpg?h=350&auto=compress&cs=tinysrgb',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus euismod vestibulum. Praesent tempus quam blandit viverra luctus. Duis fringilla nulla a ipsum porta, id pharetra felis auctor. Suspendisse et rhoncus tellus. Integer quis congue lectus. Maecenas tortor ante, gravida at volutpat in, laoreet vel elit. Phasellus ac blandit risus. Pellentesque molestie viverra arcu in fermentum. Integer sed ante eu turpis tempor feugiat ac at erat. Integer auctor eget odio a cursus. Nulla facilisi. Nunc dictum mi vel imperdiet accumsan. Aliquam vestibulum lorem vel dolor fringilla laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur sit amet lacus sit amet libero iaculis gravida et sagittis mauris.',
    author:{username:'Jack dePussy'}
  },
  {
    name:'The RV and the milky way',
    image:'https://images.pexels.com/photos/126325/pexels-photo-126325.jpeg?h=350&auto=compress&cs=tinysrgb',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus euismod vestibulum. Praesent tempus quam blandit viverra luctus. Duis fringilla nulla a ipsum porta, id pharetra felis auctor. Suspendisse et rhoncus tellus. Integer quis congue lectus. Maecenas tortor ante, gravida at volutpat in, laoreet vel elit. Phasellus ac blandit risus. Pellentesque molestie viverra arcu in fermentum. Integer sed ante eu turpis tempor feugiat ac at erat. Integer auctor eget odio a cursus. Nulla facilisi. Nunc dictum mi vel imperdiet accumsan. Aliquam vestibulum lorem vel dolor fringilla laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur sit amet lacus sit amet libero iaculis gravida et sagittis mauris.',
    author:{username:'Jack dePussy'}
  }

]

function seedDb() {
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }else {
      console.log('removed campgrounds');
       data.forEach(function (campground) {
        Campground.create(campground,function(err,campground){
          if (err) {
            console.log(err);
          }else{
            console.log("added a campground");
            Comment.create({
              text:'This place is great, but I wish there was internet',
              author:{username:'Jack dePussy'}
            },function(err,comment){
              if(err){
                console.log(err);
              }else {
                campground.comments.push(comment);
                campground.save();
                console.log('New Comment Created');
              }
            });
          }
        });
      });
    }
  });

}

module.exports = seedDb;
