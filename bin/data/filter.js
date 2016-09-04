'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-recent':
      var recent = list.filter(function(review) {
        var now = new Date();
        var created = new Date(review.created);
        return now - created < 3 * 3600 * 24 * 1000;
      });
      return recent.sort(function(a, b) {
        return b.created - a.created;
      });
    case 'reviews-good':
      var good = list.filter(function(review) {
        return review.rating >= 3;
      });
      return good.sort(function(a, b) {
        return b.rating - a.rating;
      });
    case 'reviews-bad':
      var bad = list.filter(function(review) {
        return review.rating < 3;
      });
      return bad.sort(function(a, b) {
        return b.rating - a.rating;
      });
    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
  }
  return list;
};
