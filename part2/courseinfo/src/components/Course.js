import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    const total = course.parts.reduce((sum, part) => {
        // console.log(sum, part);
        return sum+part.exercises
    }, 0)
    // console.log("total", total);

    return (
        <div>
            <Header key="header" header={course.name} />
            <Content key="content" content={course.parts} />
            <Total key="total" sum={total} />
        </div>
    )
}

export default Course