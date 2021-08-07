import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePhotoSearch(query, pageNumber = 1) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [photos, setPhotos] = useState([])
  const [hasMore, setHasMore] = useState(false)
  // const [method, setMethod] = useState("flickr.photos.getRecent")

  useEffect(() => {
    setPhotos([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    let method = query === "" ? "flickr.photos.getRecent" : "flickr.photos.search"
    axios({
      method: 'GET',
      url: 'https://www.flickr.com/services/rest/',
      params: { method: method, api_key: "4c5fce7e2f1b1032233410afc2c2ea27", page: pageNumber, text: query, format: "json", nojsoncallback: 1 },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log(res)
      setPhotos(prevPhotos => {
        return [...new Set([...prevPhotos, ...res.data.photos.photo])]
      })
      setHasMore(res.data.photos.photo.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, photos, hasMore }
}