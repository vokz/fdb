import  {useState} from 'react';
import { StyleSheet } from 'react-native';
import ProgressSteps, { Title, Content } from '@joaosousa/react-native-progress-steps';

const ApplicationStatus = ({ status }) => {
    const [step, setStep] = useState(0);
    return(
        <ProgressSteps
            style={styles.progressStepsContainer}
            currentStep={status - 1}
            steps={[
                {
                    id: 1,
                    title: <Title>Initial Submission</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
                {
                    id: 2,
                    title: <Title>LGU Verification</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
                {
                    id: 3,
                    title: <Title>PAG IBIG Pre Approval</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
                {
                    id: 4,
                    title: <Title>PAG IBIG Requirements Submission</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
                {
                    id: 5,
                    title: <Title>Notice of Approval</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
                {
                    id: 6,
                    title: <Title>Release of Proceeds</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
                {
                    id: 7,
                    title: <Title>Monthly Amortization</Title>,
                    content: <Content>{/* Your content */}</Content>,
                },
            ]}
            colors={{
                title: {
                text: {
                    normal: '#c8c9c6',
                    active: '#8bc926',
                    completed: '#8bc926',
                },
                },
                marker: {
                text: {
                    normal: '#c8c9c6',
                    active: '#8bc926',
                    completed: '#fff',
                },
                line: {
                    normal: '#c8c9c6',
                    active: '#8bc926',
                    completed: '#8bc926',
                },
                },
            }}
        />
    )
}

const styles = StyleSheet.create({
    progressStepsContainer: {
      // Custom styles for the ProgressSteps container
      marginTop: 50,
      backgroundColor: '#000'
    },
  });

export default ApplicationStatus;