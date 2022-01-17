function itemStruct(item) {
  return "<div class=\"items\">\n<p>" + item + "</p>\n</div>\n";
}

function Pagination(itemsArray, itemsPerPage, itemsStructFn) {

  this._itemsArray = itemsArray || [];
  this._itemsPerPage = itemsPerPage || 5;
  this._totalPages = Math.ceil(this._itemsArray.length / this._itemsPerPage) || 0;

  //display pages
  this._currentPage = 1;

  //previus page
  this._prevPage = this._currentPage - 1 >= 1 ? this._currentPage - 1 : this._currentPage;

  //next page
  this._nextPage = this._currentPage + 1 <= this._totalPages ? this._currentPage + 1 : this._currentPage;

  this.itemsToBeDisplayed = () => {
    let sliceStart = (this._currentPage - 1) * this._itemsPerPage;
    let sliceEnd = (this._currentPage) * this._itemsPerPage;
    let itemsArray = this._itemsArray;
    return itemsArray.slice(sliceStart, sliceEnd);
  }

  this.getPageComponent = () => {
    return `<p><button id="prev">Prev</<button>
      <button id="next">Next</button></p>`;
  }

  this.injectComponents = (targetId, component) => {
    document.getElementById(targetId).innerHTML = component;
  }

  this.getItemComponent = () => {
    return this.itemsToBeDisplayed().map((item) => itemsStructFn(item)).join("");
  }

  this.handlePrevStyle = () => {
    let prevButton = document.querySelector("#prev");
    if (this._currentPage == 1) {
      prevButton.disabled = true;
      prevButton.style.opacity = 0.2;
    } else {
      prevButton.disabled = false;
      prevButton.style.opacity = 1;
    }
  }

  this.handlePrevClick = () => {
    //prev button
    let prevButton = document.querySelector("#prev");
    prevButton.onclick = () => {
      let prevPage = this._currentPage - 1;
      let hasPrevPage = prevPage >= 1;
      this._currentPage = hasPrevPage ? prevPage : this._currentPage;
      this.injectComponents("item-component", this.getItemComponent()); this.handlePrevStyle();
      this.handleNextStyle();
    }
  }

  this.handleNextStyle = () => {
    let nextButton = document.querySelector("#next");
    if (this._currentPage == this._totalPages) {
      nextButton.disabled = true;
      nextButton.style.opacity = 0.2;
    } else {
      nextButton.disabled = false;
      nextButton.style.opacity = 1;
    }
  }

  this.handleNextClick = () => {
    //next button
    let nextButton = document.querySelector("#next");
    nextButton.onclick = () => {
      let nextPage = this._currentPage + 1;
      let hasNextPage = nextPage <= this._totalPages;
      this._currentPage = hasNextPage ? nextPage : this._currentPage;
      this.injectComponents("item-component", this.getItemComponent());
      this.handlePrevStyle();
      this.handleNextStyle();

    }
  }

  this.displayHTML = () => {
    let style = `
    body{background-color:#101515;}
    #main {min-height:300px;display:flex; flex-direction:column;width:80%;margin:auto;}
    #prev, #next{border:1px solid #505550; background-color:#303030; padding:5px 20px;box-sizing:border-box;}
    #prev{border-radius: 10px 0px 0px 10px; color:#909990;}
    #next{border-radius: 0px 10px 10px 0px; color:#909099;}    
    #item-component{padding:50px;border:1px solid #404540;background-color:#151515;}
    #title-component{padding:50px;border:1px solid #404540; border-radius:10px 10px 0px 0px;border-bottom:0px;background-color:#202520;}
    #page-component{border:1px solid #404540; border-radius:0px 0px 10px 10px; border-top:0px; width:auto; display:flex; align-items:center; justify-content:center; background-color:#202520;padding:20px 0px;}
    .items{padding:10px;color:#80b5a5}
    `;

    let template = `    
    <style>
    	${style}
    </style>    
    <div id="main">
    	<div id="title-component"></div>
      <div id="item-component"></div>
      <div id="page-component"></div>      
    </div>`;

    document.write(template);

    this.injectComponents("item-component", this.getItemComponent());
    this.injectComponents("page-component", this.getPageComponent());

    this.handlePrevStyle();
    this.handlePrevClick();

    this.handleNextStyle();
    this.handleNextClick();
  }
}

module.exports = Pagination;


//Example

var myPagination = new Pagination(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af"], 4, itemStruct);

myPagination.displayHTML();


