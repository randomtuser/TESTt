import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class TableHeader extends Component {
  render() {
    const { headers, handleSort, sortColumn, sortDirection } = this.props;

    return (
      <thead>
        <tr>
          {headers.map((head, index) => (
            <th
              colSpan={2}
              className='top-0 border-b-2 bg-white py-1 px-4  text-[#878787]  dark:bg-[#0d0d0d] dark:shadow-[inset_0px_-2px_0px_0px_rgba(64,64,64,1)] '
              key={index}
              onClick={() => handleSort(head)}
            >
              <p className='mt-2 text-center text-[16px]  3xl:text-[0.8vw] font-light hover:text-black dark:hover:text-orange-400'>
                {head}
                {sortColumn === head && sortDirection === 'asc' && '↑'}
                {sortColumn === head && sortDirection === 'desc' && '↓'}
              </p>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

class TableBody extends Component {
  render() {
    const { data, icon } = this.props;

    return (
      <tbody>
        {data.map((row, index) => {
          return (
            <tr
              className='  h-[70px] w-full  justify-between border-b-2 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#404040] dark:hover:bg-inherit dark:hover:text-orange-500'
              key={index}
            >
              {Object.values(row).map((value, rowindex) => (
                <>
                  <td className=' w-fit py-1 text-left text-[20px] 3xl:text-[0.9vw]' key={rowindex}>
                    {
                      icon && value !== '' && rowindex === 0 ? (
                        <div className=' relative -left-1 w-[4rem] scale-[.8] '>
                          <Link to={process.env.PUBLIC_URL + '/alloys'}>
                            <div className='mt-1 mb-1  flex justify-center align-middle'>
                              <div className='h-[4rem] w-[4rem] border border-black dark:border-white'>
                                <div className='align-center flex flex-col items-center justify-center '>
                                  <div className='w-[60%] border-b border-black pt-1'>
                                    <p className='text-center text-lg 3xl:text-[0.9vw] dark:text-darkWhite'>
                                      {value.substring(0, 2)}
                                    </p>
                                  </div>
                                </div>
                                <p className=' mt-0.5 text-center !text-[14px] 3xl:text-[0.9vw] dark:text-darkWhite'>
                                  {value.substring(3)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ) : icon && rowindex === 0 ? (
                        <div className='flex flex-row items-center'>
                          <Link to={process.env.PUBLIC_URL + '/crucibles'}>
                            <div className='relative right-[8px] top-1 my-auto mt-1 mb-1 flex w-[4rem] justify-center align-middle'>
                              <div className=' h-[4rem] w-[4rem] '>
                                <img
                                  src={process.env.PUBLIC_URL + '/icons/crucible.png'}
                                  alt='MM3D Logo'
                                  className='relative left-3'
                                  // className='invert'
                                ></img>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ) : (
                        <span
                          className={` relative right-[11%] text-lg 3xl:text-[0.9vw] ${
                            rowindex === 2 ? 'left-[50%]' : ''
                          }`}
                        >
                          {value}
                        </span>
                      )

                      // <span className={`  text-lg   ${rowindex == 2 ? '#ml-[100px]' : ''}`}>
                      //   {value}
                      // </span>
                    }
                  </td>
                </>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: null,
      sortDirection: null,
      headers: this.props.headers,
      data: this.props.data,
    };

    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(columnName) {
    const { data, sortColumn, sortDirection } = this.state;
    let newSortDirection = 'asc';

    if (sortColumn === columnName && sortDirection === 'asc') {
      newSortDirection = 'desc';
    }

    const sortedData = data.slice().sort((a, b) => {
      if (newSortDirection === 'asc') {
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        return a[columnName] < b[columnName] ? 1 : -1;
      }
    });

    this.setState({
      data: sortedData,
      sortColumn: columnName,
      sortDirection: newSortDirection,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
      });
    }
  }

  render() {
    const { sortColumn, sortDirection, data } = this.state;
    return (
      <table className='m-auto max-h-80 w-[98%]  table-auto border-collapse 3xl:text-[0.9vw]'>
        <TableHeader
          headers={this.props.headers}
          handleSort={this.handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <TableBody data={data} icon={this.props.icon} />
      </table>
    );
  }
}

export default Table;
