import React from 'react'
import '../../styles/components/_banner.scss';
import Link from 'next/link';
import DesktopCats from '../DesktopCats/DesktopCats';

function Banner() {
    return (


        <div className='Banner'>


            <div className='AdBlock blue_block'>
                <div className='bottom_slice'>
                    <h3>
                        ЛИКВИДАЦИЯ <span className='bigger_one'>ТОВАРА</span>
                    </h3>
                </div>
                <div className='slices'>

                    <div className='mid_slice'>
                        <p>-90%</p>
                    </div>
                    <div className='top_slice'>
                        {/* <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTmzTW6PLZNFDJdvkKSShmrA89S4KFcufOMoKcipLC-SOefy-DJ" alt="" /> */}
                    </div>
                </div>
            </div>

            <Link href='/tutorial'>
                <div className='AdBlock red_block'>
                    <div className='bottom_slice'>
                        <h3>
                            <span className='bigger_one'>КАК</span> ПРОДАВАТЬ?
                        </h3>
                    </div>
                    <div className='slices'>
                        <div className='mid_slice'>
                            <p>*легко</p>
                        </div>
                        <div className='top_slice'>
                            {/* <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQlOCzzQQBbd9OCyiXbvqD3ZzLJ35kVUQCl62Y4dlPJKXp4e3jF" alt="" /> */}
                        </div>
                    </div>

                </div>
            </Link>

        </div>


    )
}

export default Banner




{/* <Link href='/tutorial'>
<div className='AdBlock red_block'>
    <div className='bottom_slice'>
        <h3>
            <span className='bigger_one'>КАК</span> ЗАКАЗАТЬ?
        </h3>
    </div>
    <div className='slices'>
        <div className='mid_slice'>
            <p>*легко</p>
        </div>
        <div className='top_slice'>
        
        </div>
    </div>

</div>
</Link> */}