/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes

// Get the average of all rates with 2 decimals

var ratesAverage = function(array) {
  var sum = array.reduce(function(acc, movie) {
    return acc + Number(movie.rate);
  }, 0);

  return sum / array.length;
};

// Get only Drama Movies

var dramaMovies = function(array) {
  return array.filter(function(movie) {
    return movie.genre.indexOf("Drama") > -1;
  });
};

// Get the average of Drama Movies

var dramaMoviesRate = function(array) {
  var dramaArray = dramaMovies(array);

  if (dramaArray.length) {
    var average = ratesAverage(dramaArray);
    var result = Math.round(average * 100) / 100;

    return result;
  } else {
    return undefined;
  }
};

// Order by time duration, in growing order

// How many movies did STEVEN SPIELBERG

var howManyMovies = function(array) {
  if (array.length === 0) {
    return undefined;
  }

  var dramaMoviesArray = dramaMovies(array);
  var spielbergDramas = dramaMoviesArray.filter(function(item) {
    return item.director === "Steven Spielberg";
  });

  return (
    "Steven Spielberg directed " + spielbergDramas.length + " drama movies!"
  );
};

// Order by title and return the first 20 titles

var orderAlphabetically = function(array) {
  var onlyTitle = array.map(function(item) {
    return item.title;
  });

  onlyTitle.sort();

  var twentyTitle = onlyTitle.slice(0, 20);

  return twentyTitle;
};

// Best yearly rate average

var findSpecific = function(year, array) {
  return array.filter(function(item) {
    return item.year == year;
  });
};

var bestYearAvg = function(array) {
  if (array.length === 0) {
    return undefined;
  }

  var yearAverages = [];

  for (var i = 1900; i < 2018; i++) {
    var year = {};
    year.average = ratesAverage(findSpecific(i, array));
    year.year = i;
    // Average will be NaN if there were no movies found for that year, so only push to the array if average is not NaN
    if (!isNaN(year.average)) {
      yearAverages.push(year);
    }
  }

  // Sort array of years by average rating

  yearAverages.sort(function(a, b) {
    if (a.average < b.average) {
      return -1;
    } else if (a.average > b.average) {
      return 1;
    } else {
      if (a.year < b.year) {
        return 1;
      } else if (a.year > b.year) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  return (
    "The best year was " +
    yearAverages[yearAverages.length - 1].year +
    " with an average rate of " +
    yearAverages[yearAverages.length - 1].average
  );
};
