import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
 
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => 
  state.goals)
  
  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }

    // fetches the goals from the backend and puts it in goals and we'll have access to it
    dispatch(getGoals())

    // to do something when the component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>

    <p style={{margin: "-40px 0 40px 0"}}>Goals Dashboard</p>
    <section className='heading'>
      <h1>Hey {user ? user.name :''} !</h1>
    </section>

    <GoalForm />

    <section className='content'>
      {goals.length > 0 ? (
        <div className='goals'>
          {goals.map((goal)=> (
            <GoalItem key={goal._id} goal={goal}/>
          ))}
        </div>
      ) : ( <h3>You have not set any goals</h3> )}
    </section>

    </div>
  )
}

export default Dashboard