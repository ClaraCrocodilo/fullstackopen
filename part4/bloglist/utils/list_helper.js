const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        return blog.likes > favorite.likes
            ? blog
            : favorite;
    };

    return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
    const authors = {};
    for (let i = 0; i < blogs.length; i++) {
        authors[blogs[i].author] = (authors[blogs[i].author] + 1) || 1;
    }
    const authorsBlogs = [];
    for (let author in authors) {
        authorsBlogs.push({ author, blogs: authors[author] });
    }

    return authorsBlogs.reduce((authorWithMostBlogs, author) => {
        return author.blogs > authorWithMostBlogs.blogs
            ? author
            : authorWithMostBlogs;
    });
};

const mostLikes = (blogs) => {
    const authors = {};
    for (let i = 0; i < blogs.length; i++) {
        authors[blogs[i].author] = (authors[blogs[i].author] + blogs[i].likes) || blogs[i].likes;
    }
    const authorsLikes = [];
    for (let author in authors) {
        authorsLikes.push({ author, likes: authors[author] });
    }

    return authorsLikes.reduce((authorWithMostLikes, author) => {
        return author.likes > authorWithMostLikes.likes
            ? author
            : authorWithMostLikes;
    });
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
