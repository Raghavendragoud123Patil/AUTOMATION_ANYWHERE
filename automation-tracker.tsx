import React, { useState } from 'react';
import { CheckCircle2, Circle, FileText, Code, Server, ChevronDown, ChevronRight, AlertCircle, Upload, MessageSquare, FormInput, Edit3, Plus, X, Save, LogIn, Check, Clock } from 'lucide-react';

const AutomationAssignmentUI = () => {
  const [expandedSections, setExpandedSections] = useState({
    useCase1: false,
    useCase2: false,
    useCase3: false
  });

  const [completedSteps, setCompletedSteps] = useState({});

  const [testData, setTestData] = useState({
    uc1_botName: '',
    uc1_description: '',
    uc1_messageBoxTitle: '',
    uc1_messageBoxContent: '',
    uc2_formName: '',
    uc2_formDescription: '',
    uc2_textboxLabel: '',
    uc2_textboxValue: '',
    uc2_uploadedFile: '',
    uc3_instanceName: '',
    uc3_instanceDescription: ''
  });

  const [canvasElements, setCanvasElements] = useState([]);
  const [formSaved, setFormSaved] = useState(false);

  const [apiCredentials, setApiCredentials] = useState({
    username: '',
    password: ''
  });
  const [apiLoginStatus, setApiLoginStatus] = useState(null);
  const [apiInstance, setApiInstance] = useState(null);
  const [apiValidations, setApiValidations] = useState({
    statusCode: '',
    responseTime: '',
    instanceId: '',
    instanceName: '',
    instanceStatus: ''
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleDataChange = (field, value) => {
    setTestData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addElementToCanvas = (elementType) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      label: elementType === 'textbox' ? 'Text Input' : 'File Upload',
      value: ''
    };
    setCanvasElements(prev => [...prev, newElement]);
  };

  const removeElementFromCanvas = (elementId) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
  };

  const updateElementValue = (elementId, value) => {
    setCanvasElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, value } : el
    ));
  };

  const handleSaveForm = () => {
    setFormSaved(true);
    setTimeout(() => setFormSaved(false), 3000);
  };

  const handleApiLogin = () => {
    if (apiCredentials.username && apiCredentials.password) {
      setApiLoginStatus('success');
      setTimeout(() => setApiLoginStatus(null), 3000);
    } else {
      setApiLoginStatus('error');
      setTimeout(() => setApiLoginStatus(null), 3000);
    }
  };

  const handleCreateInstance = () => {
    if (testData.uc3_instanceName) {
      setApiInstance({
        id: `LI-${Date.now()}`,
        name: testData.uc3_instanceName,
        status: 'Active',
        created: new Date().toISOString()
      });
      setApiValidations({
        statusCode: '201 Created',
        responseTime: `${Math.floor(Math.random() * 200 + 100)}ms`,
        instanceId: `LI-${Date.now()}`,
        instanceName: testData.uc3_instanceName,
        instanceStatus: 'Active'
      });
    }
  };

  const getProgress = (steps) => {
    const completed = steps.filter(step => completedSteps[step.id]).length;
    return Math.round((completed / steps.length) * 100);
  };

  const SectionHeader = ({ title, section, icon: Icon, color }) => (
    <div 
      onClick={() => toggleSection(section)}
      className={`flex items-center justify-between p-4 cursor-pointer rounded-lg ${color} hover:opacity-90 transition-all`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {expandedSections[section] ? <ChevronDown /> : <ChevronRight />}
    </div>
  );

  const StepItem = ({ step, id }) => (
    <div 
      onClick={() => toggleStep(id)}
      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all"
    >
      <div className="mt-1">
        {completedSteps[id] ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </div>
      <div className="flex-1">
        <p className={`${completedSteps[id] ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {step}
        </p>
      </div>
    </div>
  );

  const useCase1Steps = [
    { id: 'uc1-1', text: 'Log in to the application' },
    { id: 'uc1-2', text: 'Navigate to Automation from the left-hand menu' },
    { id: 'uc1-3', text: 'Click on the Create dropdown and select Task Bot' },
    { id: 'uc1-4', text: 'Fill in all mandatory details and click the Create button' },
    { id: 'uc1-5', text: 'In the Actions panel, search for Message Box and double-click to add it' },
    { id: 'uc1-6', text: 'On the right panel, verify every UI element interaction' },
    { id: 'uc1-7', text: 'Save the configuration' }
  ];

  const useCase2Steps = [
    { id: 'uc2-1', text: 'Log in to the application' },
    { id: 'uc2-2', text: 'Navigate to Automation from the left-hand menu' },
    { id: 'uc2-3', text: 'Click on the Create dropdown and select Form' },
    { id: 'uc2-4', text: 'Fill in all mandatory details and click the Create button' },
    { id: 'uc2-5', text: 'From the left menu, drag and drop the Textbox and Select File elements onto the canvas' },
    { id: 'uc2-6', text: 'Click on each element and verify all UI interactions in the right panel' },
    { id: 'uc2-7', text: 'Enter text in the textbox and upload a document from your shared folder' },
    { id: 'uc2-8', text: 'Save the form and verify whether the document is uploaded successfully' }
  ];

  const useCase3Steps = [
    { id: 'uc3-1', text: 'Perform login using the provided credentials' },
    { id: 'uc3-2', text: 'After login, navigate to learning instance under AI tab' },
    { id: 'uc3-3', text: 'Create a Learning Instance' },
    { id: 'uc3-4', text: 'Validate the created instance with appropriate checks' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Automation Assignment Tracker</h1>
          <p className="text-gray-600">UI & API Testing with Playwright</p>
        </div>

        {/* Use Case 1 */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <SectionHeader 
            title="Use Case 1: Message Box Task (UI)" 
            section="useCase1" 
            icon={MessageSquare}
            color="bg-gradient-to-r from-green-500 to-green-600 text-white"
          />
          {expandedSections.useCase1 && (
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-green-600">{getProgress(useCase1Steps)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress(useCase1Steps)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                {useCase1Steps.map(step => (
                  <StepItem key={step.id} step={step.text} id={step.id} />
                ))}
              </div>

              <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Test Data Entry
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bot Name *</label>
                    <input
                      type="text"
                      value={testData.uc1_botName}
                      onChange={(e) => handleDataChange('uc1_botName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter bot name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={testData.uc1_description}
                      onChange={(e) => handleDataChange('uc1_description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter bot description"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message Box Title *</label>
                    <input
                      type="text"
                      value={testData.uc1_messageBoxTitle}
                      onChange={(e) => handleDataChange('uc1_messageBoxTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter message box title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message Box Content *</label>
                    <textarea
                      value={testData.uc1_messageBoxContent}
                      onChange={(e) => handleDataChange('uc1_messageBoxContent', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter message box content"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Use Case 2 */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <SectionHeader 
            title="Use Case 2: Form with Upload Flow (UI)" 
            section="useCase2" 
            icon={FormInput}
            color="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          />
          {expandedSections.useCase2 && (
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-blue-600">{getProgress(useCase2Steps)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress(useCase2Steps)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                {useCase2Steps.map(step => (
                  <StepItem key={step.id} step={step.text} id={step.id} />
                ))}
              </div>

              {/* Interactive Canvas Section */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <FormInput className="w-5 h-5" />
                  Form Builder Canvas
                </h3>
                
                {/* Element Selection */}
                <div className="mb-4 flex gap-3">
                  <button
                    onClick={() => addElementToCanvas('textbox')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Textbox
                  </button>
                  <button
                    onClick={() => addElementToCanvas('fileupload')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add File Upload
                  </button>
                </div>

                {/* Canvas Area */}
                <div className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-4 min-h-[200px]">
                  {canvasElements.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <FormInput className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Click buttons above to add elements to the canvas</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {canvasElements.map((element) => (
                        <div key={element.id} className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-700 flex items-center gap-2">
                              {element.type === 'textbox' ? (
                                <Edit3 className="w-4 h-4" />
                              ) : (
                                <Upload className="w-4 h-4" />
                              )}
                              {element.label}
                            </span>
                            <button
                              onClick={() => removeElementFromCanvas(element.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          {element.type === 'textbox' ? (
                            <input
                              type="text"
                              value={element.value}
                              onChange={(e) => updateElementValue(element.id, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter text here..."
                            />
                          ) : (
                            <div>
                              <input
                                type="text"
                                value={element.value}
                                onChange={(e) => updateElementValue(element.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter file path (e.g., /shared/document.pdf)"
                              />
                              <p className="text-xs text-gray-500 mt-1">Simulating file selection from shared folder</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save Form Button */}
                {canvasElements.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={handleSaveForm}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md font-semibold w-full justify-center"
                    >
                      <Save className="w-5 h-5" />
                      Save Form
                    </button>
                    {formSaved && (
                      <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Form saved successfully! Document upload verified.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Test Data Entry
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Name *</label>
                    <input
                      type="text"
                      value={testData.uc2_formName}
                      onChange={(e) => handleDataChange('uc2_formName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter form name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Description</label>
                    <textarea
                      value={testData.uc2_formDescription}
                      onChange={(e) => handleDataChange('uc2_formDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter form description"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Textbox Label *</label>
                    <input
                      type="text"
                      value={testData.uc2_textboxLabel}
                      onChange={(e) => handleDataChange('uc2_textboxLabel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter textbox label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Textbox Value *</label>
                    <input
                      type="text"
                      value={testData.uc2_textboxValue}
                      onChange={(e) => handleDataChange('uc2_textboxValue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter text to be typed in textbox"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File to Upload *</label>
                    <input
                      type="text"
                      value={testData.uc2_uploadedFile}
                      onChange={(e) => handleDataChange('uc2_uploadedFile', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter file path or name (e.g., document.pdf)"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Use Case 3 */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <SectionHeader 
            title="Use Case 3: Learning Instance API Flow (API)" 
            section="useCase3" 
            icon={Server}
            color="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
          />
          {expandedSections.useCase3 && (
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-orange-600">{getProgress(useCase3Steps)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress(useCase3Steps)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                {useCase3Steps.map(step => (
                  <StepItem key={step.id} step={step.text} id={step.id} />
                ))}
              </div>

              {/* API Login Section */}
              <div className="mt-6 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  API Authentication
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                    <input
                      type="text"
                      value={apiCredentials.username}
                      onChange={(e) => setApiCredentials({...apiCredentials, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your-username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      value={apiCredentials.password}
                      onChange={(e) => setApiCredentials({...apiCredentials, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your-password"
                    />
                  </div>
                  <button
                    onClick={handleApiLogin}
                    className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md font-semibold w-full justify-center"
                  >
                    <LogIn className="w-5 h-5" />
                    Perform API Login
                  </button>
                  {apiLoginStatus === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      API Login Successful! Ready to navigate to AI tab.
                    </div>
                  )}
                  {apiLoginStatus === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Please enter username and password.
                    </div>
                  )}
                </div>
              </div>

              {/* Create Learning Instance Section */}
              <div className="mt-6 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Create Learning Instance (AI Tab)
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Learning Instance Name *</label>
                    <input
                      type="text"
                      value={testData.uc3_instanceName}
                      onChange={(e) => handleDataChange('uc3_instanceName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter learning instance name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instance Description</label>
                    <textarea
                      value={testData.uc3_instanceDescription}
                      onChange={(e) => handleDataChange('uc3_instanceDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter instance description"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={handleCreateInstance}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md font-semibold w-full justify-center"
                  >
                    <Plus className="w-5 h-5" />
                    Create Learning Instance
                  </button>
                </div>
              </div>

              {/* API Validation Results */}
              {apiInstance && (
                <div className="mt-6 bg-white border-2 border-orange-400 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Instance Created - Validation Results
                  </h3>
                  
                  <div className="space-y-3">
                    {/* HTTP Status Code */}
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">HTTP Status Code:</span>
                        <span className="text-sm font-bold text-green-700">{apiValidations.statusCode}</span>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Response Time:
                        </span>
                        <span className="text-sm font-bold text-blue-700">{apiValidations.responseTime}</span>
                      </div>
                    </div>

                    {/* Response Body Schema */}
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Response Body Schema:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Instance ID:</span>
                          <span className="font-mono text-purple-700">{apiValidations.instanceId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Instance Name:</span>
                          <span className="font-mono text-purple-700">{apiValidations.instanceName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-mono text-purple-700">{apiValidations.instanceStatus}</span>
                        </div>
                      </div>
                    </div>

                    {/* Functional Accuracy */}
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Functional Accuracy Check:</h4>
                      <div className="space-y-1 text-sm text-green-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Instance created with correct data
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Status is "Active" as expected
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          All required fields populated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Overall Progress</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{getProgress(useCase1Steps)}%</div>
              <div className="text-sm mt-1">Use Case 1</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{getProgress(useCase2Steps)}%</div>
              <div className="text-sm mt-1">Use Case 2</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{getProgress(useCase3Steps)}%</div>
              <div className="text-sm mt-1">Use Case 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationAssignmentUI;
                