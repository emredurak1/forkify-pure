import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const current = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const _prevButton = `
    <button data-goto="${
      current - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${current - 1}</span>
  </button>`;

    const _nextButton = `
  <button data-goto="${current + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${current + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
`;

    // Page 1, and there are other pages
    if (current === 1 && numPages > 1) return _nextButton;

    // Last page
    if (current === numPages && numPages > 1) return _prevButton;

    // Other page
    if (current < numPages) return _prevButton + _nextButton;

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
