angular.module('books').service("booksService",function($http){

    this.getBooks = function(){
        return $http.get("https://www.googleapis.com/books/v1/volumes?q=HTML5")
        .then((res) => {
            return res;
        })
        .catch((err)=>{
            console.log(err);
        })


    }

})