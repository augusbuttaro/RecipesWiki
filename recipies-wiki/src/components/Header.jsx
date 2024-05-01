import { useState } from 'react'
import {Link} from 'react-router-dom'
import logoIcon from '../assets/logo-icon.png'
import favsIcon from '../assets/favs-icon.png'
import randomIcon from '../assets/random-icon.png'
import useFetchData from '../hooks/useFetchData'

function Header({ onSearch }) {
        const [searchQuery, setSearchQuery] = useState('');
        const {data, loading, error, fetchData} = useFetchData(searchQuery)
        const handleInputChange = (e) => {
            const query = e.target.value;
            setSearchQuery(query);
            onSearch(query); 
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            setSearchQuery('');
          };
  return (
    <div className='bg-blue flex justify-between '>
        <Link to='/' ><img className='px-8 h-24' src={logoIcon} /></Link>
        <form  onSubmit={handleSubmit} className='self-center '>
            <input
                    type='text'
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder='Search meals...'
                    className='py-2 px-8'
            />
            <button type='submit' className='bg-gray w-10 h-10'>O</button>
        </form>
        <div className='flex px-8'>
            <Link to='/favorites' className='flex items-center gap-4 px-4 cursor-pointer text-white hover:bg-orange'>
                <img className='h-12' src={favsIcon} />
                Favourite Meals
            </Link>
        </div>
    </div>
  )
}

export default Header
