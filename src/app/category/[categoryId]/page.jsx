import React from 'react'
import Footer from '@/app/components/footer/Footer';
import CategoryContent from '@/app/components/CategoryContent/CategoryContent';
import Header from '@/app/components/header/Header';
import MobileHeader from '@/app/components/header/MobileHeader';

function page() {
    return (
        <div>
            <Header />
            <CategoryContent />
            <Footer />
        </div>
    )
}

export default page