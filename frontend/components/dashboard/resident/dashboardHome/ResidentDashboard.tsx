import React from 'react';
import ContinueLearning from './ContinueLearning';
import FeaturedCourse from '@/components/website/home/FeaturedCourse';
import TemplateSection from './TemplateSection';
import ChildrensLearningCenter from './ChildrensLearningCenter';

const ResidentDashboard = () => {
    return (
        <div className=''>
            <ContinueLearning/>
            <FeaturedCourse/>
            <TemplateSection/>
            <ChildrensLearningCenter/>
        </div>
    );
};

export default ResidentDashboard;