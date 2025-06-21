import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FileText, Search } from 'lucide-react';

import { useGetSystemLogs } from '../../hooks/admin/useSystemLogs';
import SystemLogsTable from '../../components/admin/SystemLogsTable';
import Pagination from '../../components/common/Pagination';

const SystemLogs = () => {
  const [level, setLevel] = useState(''); 
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);


  const { data, isLoading, isError, error } = useGetSystemLogs({
    page: pageNumber,
    limit: 15,
    level: level,
    search: debouncedSearchTerm,
  });

  const logs = data?.data || [];
  const pagination = data?.pagination || {};

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="flex items-center gap-3 text-3xl text-gray-800 font-regular">
              <FileText size={30} className="text-orange-500"/>
              System Logs
            </h1>
            <p className="mt-1 text-gray-500">View recent activity and errors across the system.</p>
          </div>
        </div>

        {/* Main content card */}
        <div className="p-4 bg-white rounded-lg shadow-sm">
          {/* Filters and Search Bar */}
          <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageNumber(1); // Reset to first page on new search
                }}
                placeholder="Search log messages..."
                className="w-full h-10 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-shrink-0">
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  setPageNumber(1); 
                }}
                className="w-full h-10 p-2 border border-gray-300 rounded-md md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Levels</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          {/* Pass all necessary props to the table component */}
          <SystemLogsTable
            logs={logs}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />

          {/* Render pagination if data is available */}
          {!isLoading && logs.length > 0 && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPageNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;