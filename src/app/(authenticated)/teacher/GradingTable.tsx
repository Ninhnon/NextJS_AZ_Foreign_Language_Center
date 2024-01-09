'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
  User as UserInfo,
  Spinner,
  Tooltip,
} from '@nextui-org/react';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { ChevronDownIcon } from './ChevronDownIcon';
import { SearchIcon } from './SearchIcon';
import { columns, statusOptions } from './data';
import { capitalize } from './utils';
import { useTeacher } from '@/hooks/useTeacher';
import type { Assignment_User, User } from '@/models';
import AssignmentCard from './AssignmentCard';

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'course',
  'exercise',
  'student',
  'score', // Thêm trường score
  'files', // Thêm trường files
  'actions',
];

export default function GradingTable({ onOpen, setSelectedAssignment }) {
  console.log(
    '🚀 ~ file: GradingTable.tsx:46 ~ GradingTable ~ onOpen:',
    onOpen
  );
  const { assignments, isAssignmentsFetching, isAssignmentsLoading } =
    useTeacher();

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredAssignments = [...(assignments ?? [])];

    if (hasSearchFilter) {
      filteredAssignments = filteredAssignments.filter((assignments) =>
        assignments.course.name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredAssignments = filteredAssignments.filter((user) =>
        Array.from(statusFilter).includes(String(user.isDisabled))
      );
    }

    return filteredAssignments;
  }, [assignments, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // const handleDeleteUser = (user) => {
  //   if (user) {
  //     onDeleteUser(user?.id);
  //     toast.success('Xóa người dùng thành công', {
  //       style: {
  //         minWidth: '300px',
  //         minHeight: '50px',
  //       },
  //       position: 'bottom-right',
  //     });
  //   } else {
  //     console.error('Không thể xóa: Đối tượng người dùng không hợp lệ');
  //   }
  // };

  const renderCell = React.useCallback(
    (assignment: Assignment_User, columnKey: React.Key) => {
      const cellValue = assignment[columnKey as keyof Assignment_User];

      switch (columnKey) {
        case 'id':
          return <p>{cellValue}</p>;
        case 'course':
          return <p>{assignment.course?.name}</p>;
        case 'exercise':
          return <p>{assignment.assignment?.name}</p>;
        case 'student':
          return (
            <UserInfo
              avatarProps={{ radius: 'lg', src: assignment.user.avatar }}
              description="Học viên"
              name={assignment.user.name}
            >
              {cellValue}
            </UserInfo>
          );
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case 'phoneNumber':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case 'isDisabled':
          return (
            <Chip
              className="capitalize"
              color={user.isDisabled ? 'danger' : 'success'}
              size="sm"
              variant="flat"
            >
              {user.isDisabled ? 'ngừng hoạt động' : 'đang hoạt động'}
            </Chip>
          );
        case 'score':
          return <p>{cellValue ? `${cellValue} điểm` : 'Chưa chấm'}</p>;
        case 'files': {
          let fileElements = null;
          if (assignment?.files) {
            try {
              // Parse chuỗi JSON để chuyển thành một mảng các đối tượng
              const filesArray = JSON.parse(
                assignment?.files.replace(/\\r\\n/g, '')
              );
              // Sử dụng FileCard để hiển thị từng file
              fileElements = filesArray.map((file, index) => (
                <AssignmentCard
                  key={file.id}
                  i={index}
                  file={{
                    ...file,
                    preview: file.url, // Giả sử rằng 'url' là đường dẫn để xem trước file
                  }}
                  files={filesArray}
                />
              ));
            } catch (error) {
              console.error('Có lỗi khi parse JSON:', error);
              fileElements = <p>Lỗi khi hiển thị file</p>;
            }
          }
          return <div>{fileElements}</div>;
        }

        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Tooltip content="Chấm điểm học viên">
                <Button isIconOnly color="primary" onClick={onOpen}>
                  <EditIcon width={30} height={30} />
                </Button>
              </Tooltip>
            </div>
          );
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm theo tên khóa học ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng cộng {assignments?.length} bài tập
          </span>
          <label className="flex items-center text-default-400 text-small">
            Số dòng mỗi trang:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    assignments?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? `Tất cả ${filteredItems.length} đã được chọn`
            : `${selectedKeys.size} trên ${filteredItems.length} đã được chọn`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Trước
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Sau
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  React.useEffect(() => {
    console.log(selectedKeys, 'selectedKeys');
  }, [selectedKeys]);

  return (
    <div className="p-4">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="container-snap"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align="center"
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            isAssignmentsFetching || isAssignmentsLoading ? (
              <div className="flex flex-col items-center justify-center">
                <Spinner />
                <p className="text-lg">
                  Dữ liệu đang được tải lên, vui lòng chờ trong giây lát
                </p>
              </div>
            ) : (
              'Không tìm thấy dữ liệu'
            )
          }
          items={sortedItems}
        >
          {(item) => (
            <TableRow
              key={item.id}
              onMouseEnter={() => {
                setSelectedAssignment(item);
              }}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
