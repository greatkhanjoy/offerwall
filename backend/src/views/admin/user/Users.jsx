import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useGetUsersQuery } from '../../../features/user/userApi'

const Users = () => {
  const { data, isLoading, isError, error } = useGetUsersQuery()
  const [records, setRecords] = useState(data?.users)
  const handleFilter = (e) => {
    const keyword = e.target.value
    if(keyword === '') return setRecords(data?.users)
    const filteredData = data?.users.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()))
    setRecords(filteredData)
  }
  let content = null
  if(isLoading) {
    content = <div>Loading...</div>
  }else if(!isLoading && isError) {
    content = <div>{error.data.message}</div>
  }else if(!isLoading && !isError && data?.users?.length === 0) {
    content = <div>No users found</div>
  }else if(!isLoading && !isError && data?.users?.length > 0 ) {
    // content = data?.users.map(user => (<h2>{user.name}</h2>))


    const columns = [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
      },
      {
        name: 'Role',
        selector: 'role',
        sortable: true,
      },
      {
        name: 'Joined',
        selector: 'createdAt',
        sortable: true,
      }
    ]

    const dota = data?.users.map(user => ({
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }))

    content = (
      <div>
        <div className='text-end'>
          <input type="text" placeholder="Search" onChange={handleFilter} />
        </div>
      <DataTable columns={columns} data={records} selectableRows fixedHeader pagination>

      </DataTable>
      </div>
      
    )
      
  }


  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <div className="row">
        <h2>Users</h2>
        {content}
    </div>
  </div>
  )
}

export default Users