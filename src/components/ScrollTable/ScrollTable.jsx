import React, { useEffect, useState, useRef } from 'react';
import { getTableScroll } from '@/utils/utils'
import ProTable from '@ant-design/pro-table';

export default function (props) {
    const [scrollY, setScrollY] = useState()
    let countRef = useRef(null);
    useEffect(() => {
        let scrolly = getTableScroll({ ref: countRef })
        setScrollY(scrolly)
    }, [props])

    const scroll = !props.noScroll ? {x: props.scroll?.x, y: props.scroll && props.scroll.y ? props.scroll.y : scrollY} : {}

    return (
        <div ref={countRef}>
    	 {/* 保留Table的其他属性以及scroll.x */}
            <ProTable 
                { ...props } 
                
                scroll = {scroll} 
                className = 'my_scroll_table'
                size = 'small'
                bordered
                
                pagination= {props.Pagination||{
                    pageSizeOptions: [25,50,100],
                    defaultPageSize:25,
                    size:'default'
                }}
            />
        </div>
    )
}

