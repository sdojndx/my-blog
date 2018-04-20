const marked = require('marked')
const Post = require('../lib/mongo').Post

Post.plugin('contentToHtml',{
  afterFind:function(posts){
    return posts.map(function(post){
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne:function(post){
    if(post){
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  create:function create(post){
    return Post.create(post).exec()
  },
  getPostById:function getPpstById(postId){
    return Post
      .findOne({_id: postId})
      .populate({ path:'author',model:'User' })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },
  getPosts:function(author){
    const query = {}
    if(author){
      query.author = author
    }
    return Post
      .find(query)
      .populate({ path:'author',model:'User' })
      .sort({ _id:-1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },
  incPv:function incPv(postId){
    return Post
      .update({_id:postId},{$inc:{pv:1}})
      .exec()
  },
    // 通过文章 id 获取一篇原生文章（编辑文章）
  getRawPostById: function getRawPostById (postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .exec()
  },

  // 通过文章 id 更新一篇文章
  updatePostById: function updatePostById (postId, data) {
    return Post.update({ _id: postId }, { $set: data }).exec()
  },

  // 通过文章 id 删除一篇文章
  delPostById: function delPostById (postId) {
    return Post.deleteOne({ _id: postId }).exec()
  }
}
