import {useMemo} from "react";
import {useSortedPosts} from "./useSortedPosts";

export const useSortedProducts= (posts,filter) => {

    return useMemo(() => {
        if (filter.sort) {
            if (filter.sort === 'priceUp') {
                return [...posts].sort((a, b) => String(b['price']).localeCompare(String(a['price'])))
            }
            return [...posts].sort((a, b) => String(a[filter.sort]).localeCompare(String(b[filter.sort])))
        }
        return posts
    }, [filter.sort, posts]);
}

export const useSortedProducts = (posts,filter) => {
    const sortedPosts=useSortedPosts(posts,filter);
    return useMemo(() => {
        if(filter.input){return sortedPosts.filter(p => (p.name.toLowerCase().includes(filter.input.toLowerCase())))}
        if(filter.priceRange.from&&filter.priceRange.to){return sortedPosts.filter(p => (p.price >= filter.priceRange.from && p.price<=filter.priceRange.to))}
        return sortedPosts.filter(p => (p.name.toLowerCase().includes(filter.input.toLowerCase())))

    }, [filter, sortedPosts]);
}