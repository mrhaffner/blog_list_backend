const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

 
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    const authorArray = blogs.map(blog => blog.author)
    const uniqueArray = [...new Set(authorArray)]
    const countArray = []
    uniqueArray.forEach(author => {
        const arr = blogs.filter(blog => blog.author === author)
        countArray.push({author, blogs: arr.length})
    })

    return countArray.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    const authorArray = blogs.map(blog => blog.author)
    const uniqueArray = [...new Set(authorArray)]
    const countArray = []
    uniqueArray.forEach(author => {
        const arr = blogs.filter(blog => blog.author === author)
        countArray.push({author, likes: totalLikes(arr)})
    })

    return countArray.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs,
    mostLikes
}