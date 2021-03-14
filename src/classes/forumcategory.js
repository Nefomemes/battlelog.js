class ForumCategory {
    constructor(forum, data){
      Object.defineProperty(this, 'client', {
        value: forum.client,
        enumerable: false
      });

      Object.defineProperty(this, 'forum', {
        value: forum,
        
      })
    }
  
  /**
   * 
   * @function
   */
 
}