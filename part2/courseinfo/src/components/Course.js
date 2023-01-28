import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
    return (
        <div>
            <Header key="header" header={course.name} />
            <Content key="content" content={course.parts} />
        </div>
    )
}

export default Course