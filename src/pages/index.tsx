import Head from "next/head";
import { useCompletion } from 'ai/react'
import { useState, useEffect } from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, ClipboardCopyIcon, CrumpledPaperIcon } from '@radix-ui/react-icons';
import * as Slider from '@radix-ui/react-slider';
import SelectProvider from '@/components/SelectProvider'
import Link from "next/link";

const toneOptions = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'funny', label: 'Funny' },
];

const audienceOptions = [
  { value: 'developers', label: 'Developers' },
  { value: 'designers', label: 'Designers' },
  { value: 'marketers', label: 'Marketers' },
];

const emotionOptions = [
  { value: 'happy', label: 'Happy' },
  { value: 'sad', label: 'Sad' },
  { value: 'excited', label: 'Excited' },
];

const claudeOptions = [
  { value: 'claude-2.1', label: 'Claude 2.1' },
  { value: 'claude-instant-1.2', label: 'Claude Instant 1.2' },
];

export default function Home() {
  const [clipboard, setClipboard] = useState('');
  const [elonCheck, setElonCheck] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [length, setLength] = useState(70);
  const [tone, setTone] = useState('');
  const [audience, setAudience] = useState('');
  const [emotion, setEmotion] = useState('');
  const [claude, setClaude] = useState('');

  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/completion',
    body: {
      hashtags: isCheckboxChecked,
      elon: elonCheck,
      length: length,
      tone: tone,
      audience: audience,
      emotion: emotion,
      claude: claude,
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(clipboard);
  }

  useEffect(() => {
    setClipboard(completion);
  }, [completion]);

  return (
    <>
      <Head>
        <title>FeedBack with Claude</title>
        <meta name="description" content="Get tweet/post feedback from Claude!" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content="FeedBack with Claude" />
        <meta property="og:description" content="Get tweet/post feedback from Claude!" />
        <meta property="og:image" content="https://feedbackclaude.vercel.app/og.png" />
        <meta property="og:url" content="https://feedbackclaude.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zaidmukaddam" />
        <meta name="twitter:creator" content="@zaidmukaddam" />
        <meta name="twitter:title" content="FeedBack with Claude" />
        <meta name="twitter:description" content="Get tweet/post feedback from Claude!" />
        <meta name="twitter:image" content="https://feedbackclaude.vercel.app/og.png" />
        <meta name="twitter:image:alt" content="FeedBack with Claude" />
      </Head>
      <main className={`flex min-h-screen flex-col`}>
        <nav className="px-5 py-4">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-medium flex flex-row justify-center leading-4.5">
              <CrumpledPaperIcon className="w-5 h-5 text-[#CB785C] mr-1" />
              Feedback with Claude
            </div>
          </div>
        </nav>
        <div className="sm:dot-background mx-4 mb-4 h-full grow rounded-xl border-slate-100 pb-5 sm:border sm:bg-slate-50/50">
          <div className="flex flex-col items-center pt-4">
            <div className="mt-2 w-full max-w-2xl pb-6">
              <div className="flex w-full flex-col space-y-2 text-center">
                <h1 className="text-[#CB785C] text-xl font-semibold flex-row flex justify-center leading-5">
                  <CrumpledPaperIcon className="w-5 h-5 mr-1" />
                  Feedback with Claude
                </h1>
                <p className="text-gray-500 ">
                  An AI that judges your tweets/posts and gives you feedback or judge the way your audience would.
                </p>
              </div>
            </div>
            <div className="w-full max-w-2xl space-y-6">
              <form className="space-y-2.5" onSubmit={handleSubmit}>
                <div className="rounded-xl bg-white divide-y divide-slate-100 font-medium text-slate-800 w-full card-shadow">
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <CrumpledPaperIcon className="w-5 h-5 text-[#CB785C]" />
                      <div className="text-md">Write or paste your tweet/post here!</div>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 text-sm">
                    <textarea value={input} onChange={handleInputChange} className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB785C] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="text" placeholder="Enter your tweet/post here...."></textarea>
                  </div>
                  <div className="px-4 py-2.5">
                    <div className="space-y-4 py-2">
                      <label htmlFor="slider" className="block mb-2 text-sm font-medium text-slate-800">Harshness of Feedback: {length}%</label>
                      <Slider.Root
                        id="slider"
                        className="relative flex w-full touch-none select-none items-center"
                        min={0}
                        max={100}
                        step={1}
                        value={[length]}
                        onValueChange={(value) => setLength(value[0])}
                      >
                        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100">
                          <Slider.Range className="absolute h-full bg-black" />
                        </Slider.Track>
                        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-black bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                      </Slider.Root>
                    </div>
                  </div>
                  <div className="px-4 py-2.5">
                    <div className="py-2 grid grid-rows-2 sm:flex sm:flex-row gap-4">
                      <SelectProvider
                        options={toneOptions}
                        placeholder="Select tone"
                        label="Tone"
                        value={tone}
                        onValueChange={setTone}
                      />
                      <SelectProvider
                        options={audienceOptions}
                        placeholder="Select audience"
                        label="Audience"
                        value={audience}
                        onValueChange={setAudience}
                      />
                      <SelectProvider
                        options={emotionOptions}
                        placeholder="Select emotion"
                        label="Emotion"
                        value={emotion}
                        onValueChange={setEmotion}
                      />
                      <SelectProvider
                        options={claudeOptions}
                        placeholder="Select Claude"
                        label="Claude"
                        value={claude}
                        onValueChange={setClaude}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-2.5">
                    <div className="flex items-center space-x-4 py-1">
                      <Checkbox.Root
                        className="peer h-4 w-4 shrink-0 rounded-sm border border-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:text-white"
                        checked={elonCheck}
                        onCheckedChange={(checked) => {
                          if (checked === true || checked === false) {
                            setElonCheck(checked);
                          }
                        }}
                        id="c1"
                      >
                        <Checkbox.Indicator className="flex items-center justify-center text-current">
                          <CheckIcon className="h-4 w-4" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor="c1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <span className="text-sm font-medium text-slate-800">Elon POV?</span>{" "}<span className="text-xs font-medium text-slate-500">(Get feedback from Elon Musk)</span>
                      </label>
                    </div>
                  </div>
                  <div className="px-4 py-2.5">
                    <div className="flex items-center space-x-4 py-1">
                      <Checkbox.Root
                        className="peer h-4 w-4 shrink-0 rounded-sm border border-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:text-white"
                        checked={isCheckboxChecked}
                        onCheckedChange={(checked) => {
                          if (checked === true || checked === false) {
                            setIsCheckboxChecked(checked);
                          }
                        }}
                        id="c2"
                      >
                        <Checkbox.Indicator className="flex items-center justify-center text-current">
                          <CheckIcon className="h-4 w-4" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor="c2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <span className="text-sm font-medium text-slate-800">Add hastags?</span>{" "}<span className="text-xs font-medium text-slate-500">(Add hastags to your tweet feedback)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="rounded-xl py-2 bg-white font-medium text-slate-800 w-full card-shadow disabled:cursor-not-allowed" disabled={!input && !audience && !tone && !emotion && !claude}>
                  Get Feedback
                </button>
              </form>
              {isLoading && !completion && (
                <div className="w-full flex items-center justify-center">
                  <div className="card-shadow p-2 bg-white rounded-full">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500 animate-spin">
                      <path fill="currentColor" d="M12 2.75c5.1 0 9.25 4.14 9.25 9.25 0 5.1-4.15 9.25-9.25 9.25 -5.11 0-9.25-4.15-9.25-9.25 0-1.45.33-2.85.96-4.12 .18-.38.03-.83-.34-1.01 -.38-.19-.83-.04-1.01.33 -.74 1.47-1.12 3.09-1.12 4.77 0 5.93 4.81 10.75 10.75 10.75 5.93 0 10.75-4.82 10.75-10.75 0-5.94-4.82-10.75-10.75-10.75 -.42 0-.75.33-.75.75 0 .41.33.75.75.75Z"></path>
                    </svg>
                  </div>
                </div>
              )}
              {completion && (
                <div className="rounded-xl bg-white divide-y divide-slate-100 font-medium text-slate-800 w-full card-shadow">
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="text-md">Feedback</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <button className="flex items-center" onClick={copyToClipboard}>
                          <ClipboardCopyIcon className="w-4 h-4 text-slate-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 text-sm">
                    <div className="flex space-x-4 prose">
                      {completion}
                    </div>
                  </div>
                </div>
              )}
              <div className="text-sm font-normal text-slate-500 hover:text-slate-800 transition-color duration-500 text-center">
                Every feedback is unique and generated by <Link href="https://www.anthropic.com/index/claude-2-1">Claude 2.1</Link> and <Link href="https://www.anthropic.com/index/releasing-claude-instant-1-2">Claude Instant 1.2</Link>.
                It may not be accurate.
              </div>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-slate-800">
                  Made with ❤️ by <a href="https://x.com/zaidmukaddam">@zaidmukaddam</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
