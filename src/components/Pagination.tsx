import NumberDropdown from "@/components/common/NumberDropDown";

interface PaginationProps {
  page: number;
  totalCount: number;
  offset: number;
  onPageChange: (selectedPage: string) => void;
  onOffsetChange: (selectedOffset: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalCount,
  offset,
  onPageChange,
  onOffsetChange,
}) => {
  const startRange = (page - 1) * offset + 1;
  const endRange = Math.min(page * offset, totalCount);
  const totalPages = Math.ceil(totalCount / offset);

  return (
    <div className="flex flex-wrap  sm:flex-row gap-4 itmes-start sm:items-center justify-between bg-[#262626] py-3 px-12">
      <div className="flex flex-row gap-4 items-center">
        <div className="text-[24px] text-white">Page</div>
        <NumberDropdown
          options={Array.from({ length: totalPages }, (_, i) =>
            (i + 1).toString()
          )}
          selected={page.toString()}
          onSelect={onPageChange}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="text-[24px] text-white">Rows per page</div>
        <NumberDropdown
          options={["5", "8", "10", "15", "20"]}
          selected={offset.toString()}
          onSelect={onOffsetChange}
        />
      </div>
      <div className="text-[24px] text-white">
        {`${startRange}-${endRange} of ${totalCount}`}
      </div>
      <div className="flex gap-4 text-[24px] text-white">
        <button
          disabled={page === 1}
          onClick={() => onPageChange((page - 1).toString())}
        >
          {"<"}
        </button>
        <button
          disabled={endRange === totalCount}
          onClick={() => onPageChange((page + 1).toString())}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
