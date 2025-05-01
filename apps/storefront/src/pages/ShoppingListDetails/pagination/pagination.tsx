import { memo } from 'react';
// import { IconArrowNext } from '../../../assets/icons/arrow-next';
// import { IconArrowPrev } from '../../../assets/icons/arrow-prev';
import { ExpPaginationController } from './pagination-controller';
import { IconArrowPrev } from '@/components/experro/assets/icons/arrow-prev';
import { IconArrowNext } from '@/components/experro/assets/icons/arrow-next';

interface PaginationProps {
  itemList: any;
  totalCount: number;
  setPageNumber: any;
  usingQueryParams?: {
    changeQueryParamFilter: any;
    useQueryParams: boolean;
  };
  skip: number;
  pageNumber?: string | number;
  enableScrollViewOnClick?: boolean;
}

/**
 * A pagination component that handles navigation between list of pages.
 * @param itemList - The list of items to paginate.
 * @param totalCount - The total count of items.
 * @param setPageNumber - A useState to set the current page number.
 * @param usingQueryParams - Optional configuration for using query parameters in pagination.
 * @param skip - The number of items to skip in the pagination.
 * @param pageNumber - The current page number.
 * @param enableScrollViewOnClick - A flag indicating whether to enable scrolling to top on page change.
 * @returns Rendered pagination component.
 */
const ExpPagination = (props: PaginationProps) => {
  const {
    itemList,
    totalCount,
    setPageNumber,
    skip,
    pageNumber = 1,
    enableScrollViewOnClick = true,
  } = props;

  const callController = () => {
    if (itemList?.length && totalCount > 0) {
      return ExpPaginationController({
        itemList,
        totalCount,
        setPageNumber,
        skip,
        pageNumber,
        enableScrollViewOnClick,
      });
    }
  };

  const {
    handleNextPageClick,
    handlePageNumberClick,
    handlePreviousPageClick,
    paginationPageControl,
  } = callController() || {};

  return (
    <>
      <div className="page-bottom-section m-t-40">
        {paginationPageControl?.pages?.length ? (
          <div className="pagination pagination-section">
            <ul className="pagination-list flex list-style-none mt-6 gap-2">
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <li
                className="page-prev mr-auto flex items-center cursor-pointer hover:text-primary"
                onClick={handlePreviousPageClick}>
                <IconArrowPrev />
                Previous
              </li>
              {paginationPageControl?.pages?.map(
                (page: string | number, index: number) => (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    key={index}
                    onClick={() => {
                      // @ts-ignore @typescript-eslint/ban-ts-comment
                      handlePageNumberClick(page, index);
                    }}
                    className={
                      page === (pageNumber ? +pageNumber : 1)
                        ? 'active cursor-pointer group'
                        : 'cursor-pointer group'
                    }>
                    <span className="w-8 h-8  flex justify-center items-center group-[.active]:bg-primary group-[.active]:text-white group-hover:bg-primary group-hover:text-white">
                      {page}
                    </span>
                  </li>
                )
              )}

              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <li
                className="page-next ml-auto flex items-center cursor-pointer hover:text-primary"
                onClick={handleNextPageClick}>
                Next
                <IconArrowNext />
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default memo(ExpPagination);
