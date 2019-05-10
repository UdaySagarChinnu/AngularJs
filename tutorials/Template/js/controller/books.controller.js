angular.module('books').controller('booksController',function($scope,booksService,$localStorage,){

   
    var books = angular.copy($scope.orderBookStore);
    $scope.feature = "Featured"
    $scope.selected = [];
    $scope.selectedBooks;
    $scope.booksCopy;
    $scope.orderBookStore;
    //$scope.isSelected = false;
    $scope.bookItems;
    $scope.bookArr;
    $scope.compareOnRefresh = function(){
      if($scope.selectedBooks != null && $scope.selectedBooks != "")
      {
        angular.forEach($scope.selectedBooks,function(single){
          angular.forEach($scope.orderBookStore.items,function(item){

            if(single.id == item.id)
            {
              item.isSelected = true;
              $scope.selected.push((single));
              //$scope.delectBook
            }
          
          })
        })
       
         
          console.log("In compare :"+ $scope.selected);
          return true;
              }
    }

    $scope.getBooks= function(){
     
     

       booksService.getBooks().then((data) => {
                 //console.log("controller data :"+JSON.stringify(data.data));
                  $scope.orderBookStore = data.data;
                  //$scope.selectedBookItems = angular.copy($scope.orderBookStore);
                  angular.forEach($scope.orderBookStore.items,function(book){
                    book.isSelected = false;
                  });

                  var localBooks = localStorage.getItem('selectedItem');
                  $scope.selectedBooks = JSON.parse(localBooks);
                  //console.log("Book is :"+$scope.selectedBooks);
                  $scope.compareOnRefresh();
                  localStorage.removeItem('selectedItem');
                  localStorage.setItem('selectedItem',JSON.stringify($scope.selectedBooks));
             })
    }
    $scope.getBooks();


    $scope.selectBook = function(book){
     
      if(!$scope.selected.includes(book) &&  book.isSelected != true )
      {
        book.isSelected = true;
        $scope.selected.push(book);
        console.log($scope.selected);
        $scope.selectedBooks=$scope.selected;
        localStorage.setItem('selectedItem',JSON.stringify($scope.selected));
      }
      else //if(!$scope.selected.includes(book) && book.isSelected == true)
        {
            var index = $scope.selected.indexOf(book);
            //var index1 = $scope.selected.indexOf(book)
            book.isSelected = false;
            $scope.selected.splice(index,1);
            localStorage.setItem('selectedItem',JSON.stringify($scope.selected));
            console.log($scope.selected);
        }
      
      
    }
    
})