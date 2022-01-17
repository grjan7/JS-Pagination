/**
 * //element construction for each item
 * @param {any} item 
 * @returns returns a HTML Element
 * 
 */
function itemStruct(item) {
  return "<div class=\"items\">\n<p>" + item + "</p>\n</div>\n";
}

/**
 * 
 * @param {array} itemsArray 
 * @param {number} itemsPerPage 
 * @param {function} itemsStructFn
 * 
 */
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

  this.pagesArray = () => {
    let pagesArr = [];
    for (let i = 1; i <= this._totalPages; i++) {
      pagesArr.push(i);
    }
    return pagesArr;
  }

  this.setButtonInnerText = () => {

    let pageArr = this.pagesArray();

    if (this._totalPages > 4) {
      let start = this._currentPage - 1 >= 0 ? this._currentPage - 1 : this._currentPage;
      let end = this._currentPage + 2 <= this._totalPages ? this._currentPage + 2 : this._totalPages;

      let isLenFour = pageArr.slice(start, end).length == 43;
      pageArr = isLenFour ? pageArr.slice(start, end) : pageArr.slice(end - 3, end);
    }

    for (let i = 0; i < 3; i++) {
      document.getElementById(`page-button-${i + 1}`).innerText = pageArr[i];
    }
  }

  this.getPageComponent = () => {
    return `<p><button id="prev">Prev</<button>` +
      this.pagesArray().map((page) => `<button class="pages" id="page-button-${page}">${page}</<button>`).join("") + `<button id="next">Next</button></p>`;
  }

  this.injectComponents = (targetId, component) => {
    document.getElementById(targetId).innerHTML = component;
  }

  this.getItemComponent = () => {
    return this.itemsToBeDisplayed().map((item) => itemsStructFn(item)).join("");
  }

  this.handlePageStyle = () => {
    let pagesButton = document.querySelectorAll(".pages");
    pagesButton.forEach((page) => {
      let isCurrentPage = this._currentPage == (Number)(page.innerText);
      if (isCurrentPage) {
        page.style.border = "1px solid #9090f5";
        page.style.borderBottom = "5px solid #9090c5";
        page.style.fontWeight = "bold";
      } else {
        page.style.border = "0px";
        page.style.fontWeight = "normal";
      }
    })
  }

  this.handlePageClick = () => {
    let pageButtons = document.querySelectorAll(".pages");
    pageButtons.forEach((page) => {
      let pageNumber = (Number)(page.innerText);
      page.onclick = () => {
        this._currentPage = pageNumber;
        this.injectComponents("item-component", this.getItemComponent());
        this.handlePageStyle();
        this.handlePrevStyle();
        this.handleNextStyle();
      }
    });
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
      this.injectComponents("item-component", this.getItemComponent());
      this.handlePageStyle();
      this.handlePrevStyle();
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
      this.handlePageStyle();
      this.handlePrevStyle();
      this.handleNextStyle();
    }
  }

  this.displayHTML = () => {

    let style = `
    #main {min-height:300px;display:flex; flex-direction:column;width:80%;margin:auto;}
    button{border:0px; background-color:white;margin:5px; color:#505069; padding:10px;box-sizing:border-box;border-radius:50px;}
    button:hover{background-color:#d0d0f0;color:#5050f0;}
    #item-component{padding:50px;border:1px solid #d0d0f0;}
    #title-component{padding:50px;border:1px solid #d0d0f0; border-radius:10px 10px 0px 0px;border-bottom:0px;background-color:#f5f5ff;}
    #page-component{border:1px solid #d0d0f0; border-radius:0px 0px 10px 10px; border-top:0px; width:auto;display:flex; align-items:center;justify-content:center;background-color:#f5f5ff;}
    .items{padding:10px;}
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
    this.handlePageStyle();
    this.handlePrevStyle();
    this.handleNextStyle();
    this.handlePageClick();
    this.handlePrevClick();
    this.handleNextClick();
  }
}

module.exports = Pagination;


//Example

var myPagination = new Pagination(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af"], 4, itemStruct);

myPagination.displayHTML();
