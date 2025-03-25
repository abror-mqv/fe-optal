import { BACK_URL } from '@/app/VAR'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OneBox from './OneBox'
import ShareModal from '@/app/components/ui-kit/ShareModal/ShareModal'

function Content() {
    const [boxids, setBoxIds] = useState([])
    const [fetchedBoxes, setFetchedBoxes] = useState([])
    const [shareModalOpen, setShareModalOpen] = useState(false)
    const [urlToShare, setUrlToShare] = useState("")
    const [localStorageUpdateFlag, setLocalStorageUpdateFlag] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {

        console.log("BOX_IDS_FETCHED")
        axios.post(`${BACK_URL}/api/factories/get_suppliers_info/`, {
            supplier_ids: boxids
        }).then(res => {
            setFetchedBoxes(res.data)
            setIsEmpty(false)
            console.log(res)
        }).catch(err => {
            setIsEmpty(true)
            setFetchedBoxes([])
            console.log(err)
        })


    }, [boxids])


    const reload = () => {
        console.log("RELOADDDD^^^     ")
        console.log(localStorageUpdateFlag)

        setLocalStorageUpdateFlag(!localStorageUpdateFlag)
        console.log(localStorageUpdateFlag)
    }

    useEffect(() => {
        setBoxIds(JSON.parse(localStorage.getItem("subscriptions")))
    }, [localStorageUpdateFlag])

    const EmptyView = () => {
        return (
            <div className='EmptyView'>
                <h4>
                    Список ваших подписок пуст
                </h4>
                <p>
                    Находите лучших производителей и сохраняйте, чтобы не потерять!
                </p>
            </div>
        )
    }

    return (
        <div className='SubsContent'>
            
            <div className='List'>
                {
                    fetchedBoxes.map((box, index) => {
                        return (
                            <OneBox key={index} box_data={box} setShareModalOpen={setShareModalOpen} setUrlToShare={setUrlToShare} reload={reload} />
                        )
                    })
                }
                {
                    isEmpty ? <EmptyView /> : <></>

                }

            </div>
            <ShareModal open={shareModalOpen} onClose={() => {
                setShareModalOpen(false)
            }} url={urlToShare} />
        </div>
    )
}

export default Content