const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
    const sumOfLikes = list.reduce((accumulator, currentObject) => {
  return accumulator + currentObject.likes;
}, 0); // The 0 is the initial value of the accumulator

    return sumOfLikes
}

module.exports = {
  dummy,
  totalLikes
}