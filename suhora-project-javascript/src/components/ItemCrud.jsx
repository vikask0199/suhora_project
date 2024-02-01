import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData, updateData, deleteData, searchByAuthor } from "../features/crudSlice"
import { toast } from 'react-toastify'

const ItemCrud = () => {
  const username = useSelector((state) => state.auth.currentUser.name)
  const data = useSelector((state) => state.crud.data)
  const searchData = useSelector((state) => state.crud.searchResults)
  const [updateNewText, setNewText] = useState('')
  const [editintingItemIndex, setEditingItemIndex] = useState('')
  const [authorName, setAuthorName] = useState('')
  const dispatch = useDispatch()
  const [addText, setAddText] = useState('')
  const currentAutherName = username
  const [activeTab, setActiveTab] = useState(1)

  // submit new data
  const handleSubmitData = (e) => {
    e.preventDefault();
    if (addText && currentAutherName) {
      const addNewData = {
        text: addText,
        autherName: currentAutherName
      }
      dispatch(addData(addNewData))
    }
    else {
      toast.info('Something went wrong')
    }
  }



  // updateDAta
  const handleUpdateData = (id) => {
    if (id && updateNewText) {
      const updateDataText = {
        id: id,
        newText: updateNewText
      }
      dispatch(updateData(updateDataText))
      setEditingItemIndex('')
    }
  }

  // delete Data
  const handleDeleteData = (id) => {
    if (id) {
      const deleteId = {
        id: id,
      }
      dispatch(deleteData(deleteId))
    }
  }


  // search data by author name
  const handleSearchByAuthor = (e) => {
    e.preventDefault();
    if (authorName) {
      dispatch(searchByAuthor(authorName))
    }
    else {
      toast.info('Something went wrong')
    }
  }


  return (
    <div className='h-full w-full overflow-y-auto p-2 flex flex-col gap-3'>
      <div className='flex'>
        <button onClick={() => setActiveTab(1)} className={`w-20 border   font-semibold ${activeTab === 1 ? 'bg-white text-purple-700' : 'text-white'}`}>CRUD</button>
        <button onClick={() => setActiveTab(2)} className={`w-20 border  font-semibold ${activeTab === 2 ? 'bg-white text-purple-700' : 'text-white'}`}>SEARCH</button>
      </div>

      {
        activeTab === 1 ? (
          <div className='md:w-[40%] w-full flex flex-col gap-3'>
            <form className='w-full flex' onSubmit={handleSubmitData}>
              <input type="text" className='h-14 w-full outline-none indent-2 placeholder:text-cyan-600 placeholder:font-bold' placeholder='Enter new text here' onChange={(e) => setAddText(e.target.value)} />
              <button className='w-24 h-14 bg-blue-700 font-semibold text-white hover:bg-blue-600 duration-300'>Submit</button>
            </form>
            <div className='flex flex-col gap-2'>
              {
                data.map((item, index) => {
                  return (
                    <div key={index} className='w-full gap-2 bg-white text-black flex flex-col rounded-md h-auto p-2'>
                      <div className='flex justify-between'>
                        <p className='text-gray-700 font-bold'>{item.autherName}</p>
                        <div className='flex gap-2'>
                          <button className='text-sm border border-solid border-blue-700 px-1 font-semibold text-blue-700 hover:text-white hover:bg-blue-700 duration-300' onClick={() => setEditingItemIndex(item.id)}>Edit</button>
                          <button className='text-sm border border-solid border-green-700 px-1 font-semibold text-green-700 hover:text-white hover:bg-green-700 duration-300' onClick={() => handleUpdateData(item.id)}>Submit</button>
                          <button className='text-sm border border-solid border-red-700 px-1 font-semibold text-red-700 hover:text-white hover:bg-red-700 duration-300' onClick={() => handleDeleteData(item.id)}>Delete</button>
                        </div>
                      </div>
                      <textarea className='text-gray-700 border outline-none h-auto' rows={4} cols={1} required disabled={(editintingItemIndex === item.id) ? false : true} onChange={(e) => setNewText(e.target.value)}>{item.text}</textarea>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : (
          <div className='md:w-[40%] w-full h-auto flex flex-col gap-3'>
            <form className='w-full flex' onSubmit={handleSearchByAuthor}>
              <input type="Enter author name" className='h-14 w-full outline-none indent-2 placeholder:text-cyan-600 placeholder:font-bold' required onChange={(e) => setAuthorName(e.target.value)} placeholder='Enter author name here' />
              <button className='w-24 h-14 bg-blue-700 font-semibold text-white hover:bg-blue-600 duration-300'>Search</button>
            </form>
            <div className='flex flex-col gap-2'>
              {
                searchData.map((item, index) => {
                  return (
                    <div key={index} className='w-full gap-2 bg-white text-black flex flex-col rounded-md h-auto p-2'>
                      <div className='flex justify-between'>
                        <p className='text-gray-700 font-bold'>{item.autherName}</p>
                        <div className='flex gap-2'>
                          {/* <button className='text-sm border border-solid border-blue-700 px-1 font-semibold text-blue-700 hover:text-white hover:bg-blue-700 duration-300' onClick={() => setEditingItemIndex(item.id)}>Edit</button>
                        <button className='text-sm border border-solid border-green-700 px-1 font-semibold text-green-700 hover:text-white hover:bg-green-700 duration-300' onClick={() => handleUpdateData(item.id)}>Submit</button>
                        <button className='text-sm border border-solid border-red-700 px-1 font-semibold text-red-700 hover:text-white hover:bg-red-700 duration-300' onClick={() => handleDeleteData(item.id)}>Delete</button> */}
                        </div>
                      </div>
                      <textarea className='text-gray-700 border outline-none h-auto' rows={4} cols={1} required disabled={(editintingItemIndex === item.id) ? false : true} onChange={(e) => setNewText(e.target.value)}>{item.text}</textarea>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ItemCrud