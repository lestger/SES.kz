import {useMemo} from "react";

export const useSortedPosts= (posts,filter) => {

    const sortedPosts=useMemo(()=>{
        if(filter.sort){
            if(filter.sort==='priceUp'){return [...posts].sort((a, b) => String(b['price']).localeCompare(String(a[''])))}
            return [...posts].sort((a, b) => String(a[filter.sort]).localeCompare(String(b[filter.sort])))
        }
        return posts
    },[filter.sort,posts])
    return sortedPosts;
}

export const usePost = (posts,filter) => {
    const sortedPosts=useSortedPosts(posts,filter);
    return useMemo(() => {
        if(filter.input){return sortedPosts.filter(p => (p.name.toLowerCase().includes(filter.input.toLowerCase())))}
        if(filter.address){return sortedPosts.filter(p => (p.address.toLowerCase().includes(filter.address.toLowerCase())))}
        if(filter.maxFloor){return sortedPosts.filter(p => (p.floors <= filter.maxFloor))}
        if(filter.roomQuantity){return sortedPosts.filter(p => (p.rooms >= filter.roomQuantity))}
        if(filter.priceRange.from&&filter.priceRange.to){return sortedPosts.filter(p => (p.price >= filter.priceRange.from && p.price<=filter.priceRange.to))}
        return sortedPosts.filter(p => (p.name.toLowerCase().includes(filter.input.toLowerCase())))

    }, [filter, sortedPosts]);
}