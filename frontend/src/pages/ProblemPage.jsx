import React, { useEffect, useState } from 'react'
import {useNavigate , useParams} from "react-router"
import {PROBLEMS} from "../data/problems"
import {Panel,PanelGroup,PanelResizeHandle} from "react-resizable-panels";
import ProblemDescription from '../components/ProblemDescription';
import Navbar from '../components/Navbar';
import OutputPanel from '../components/OutputPanel';
import CodeEditor from '../components/CodeEditor';
import { executeCode } from '../lib/piston';
import  toast from "react-hot-toast";
import confetti from "canvas-confetti";




function ProblemPage() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [currentProblemId,setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage,setSelectedLanguage] = useState("javascript");
  const [code,setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output,setOutput] = useState(null);
  const [isRunning,setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId]
  console.log(currentProblem);
  

  useEffect(()=>{ // update problem when URL parameter changes 
    if(id && PROBLEMS[id]){
      setCurrentProblemId(id)
      setCode(PROBLEMS[id].starterCode[selectedLanguage])
      setOutput(null)
    }
  },[id,selectedLanguage])

  const handleLanguageChange = (e)=>{
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  }
  const handleProblemChange = (newProblemId)=> navigate(`/problem/${newProblemId}`)
  const triggerConfetti = (e)=>{
      confetti({
      particleCount:80,
      spread:250,
      origin:{x:0.2,y:0.6},
    });

     confetti({
      particleCount:80,
      spread:250,
      origin:{x:0.8,y:0.6},
    });
  }

  const normalizeOutput = (output)=>{
    // normalize output for comparison (trim whitespace,handle different spacing)
    return output
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        // remove spaces after [ and before ]
        .replace(/\[\s+/g,"[")
        .replace(/\s+\]/g,"]")
        // normalize spaces around commas to single space after comma
        .replace(/\s*,\s*/g,",")
    )
    .filter((line)=>line.length>0)
    .join("\n");
  };

  const checkIfTestsPassed = (actualOutput,expectedOutput)=>{
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    console.log(normalizedActual,'*',normalizedExpected);
    
    return normalizedActual === normalizedExpected;
  };
  const handleRunCode = async ()=>{
    console.log("swagat");
    
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage,code)
    console.log(result);
    
    setOutput(result)
    setIsRunning(false)

    //check if code executed successfully and mismatches expected output
    if(result.success){
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
      const testsPassed = checkIfTestsPassed(result.output,expectedOutput)
      console.log(testsPassed);
      
      if(testsPassed){
        triggerConfetti();
         toast.success("All tests passed! Great job!")
      }else{
        toast.error("Tests failed . Check your output")
      }
    }
    else{
      toast.error("Code execution failed!");
    }
  }
  return (
    <div className='h-screen  bg-base-200 flex flex-col'>
      <Navbar/>
      <div className='flex-1'>
        <PanelGroup direction='horizontal'>

          {/* left panel-problem desc*/}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription 
            problem={currentProblem}
            currentProblemId={currentProblemId}
            onProblemChange={handleProblemChange}
            allProblems={Object.values(PROBLEMS)}
             />

          </Panel>

          <PanelResizeHandle className='w-0.5 bg-amber-400 hover:bg-secondary transition-colors
          cursor-col-resize'/>

          {/* right panel-code editor & output */}
          <Panel defaultSize={40} minSize={30}>
            <PanelGroup direction='vertical'>
              {/* Top panel- Code editor */}
              <Panel defaultSize={70} minSize={30}>
                  <CodeEditor
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                  />
              </Panel>

              <PanelResizeHandle className='h-0.5 bg-amber-400 hover:bg-secondary transition-colors
              cursor-col-resize'/>

              {/* Bottom panel- Output editor */}
              <Panel defaultSize={30} minSize={30}>
                  <OutputPanel
                  output={output}
                  />
              </Panel>

            </PanelGroup>
            <ProblemDescription/>
          </Panel>
          
        </PanelGroup>
      </div>
    </div>
  )
}

export default ProblemPage