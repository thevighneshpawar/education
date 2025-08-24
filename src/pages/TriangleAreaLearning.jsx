"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
    ChevronLeft,
    ChevronRight,
    Triangle,
    Calculator,
    Ruler,
    MapPin,
    Play,
    CheckCircle,
    XCircle,
} from "lucide-react"

export default function TriangleAreaCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [animationStep, setAnimationStep] = useState(0)

    // Interactive values for different slides
    const [base, setBase] = useState(8)
    const [height, setHeight] = useState(6)
    const [sideA, setSideA] = useState(5)
    const [sideB, setSideB] = useState(4)
    const [sideC, setSideC] = useState(3)
    const [angle, setAngle] = useState(60)

    const [quizAnswers, setQuizAnswers] = useState({})
    const [showFeedback, setShowFeedback] = useState({})
    const [score, setScore] = useState(0)

    const [coordinates, setCoordinates] = useState({
        A: { x: 90, y: 180 },
        B: { x: 170, y: 120 },
        C: { x: 130, y: 80 },
    })
    const [isDragging, setIsDragging] = useState(null)

    const slides = [
        {
            id: 1,
            title: "Basic Formula",
            subtitle: "Area = ½ × base × height",
            color: "purple",
            icon: Triangle,
            type: "concept",
        },
        {
            id: 2,
            title: "Quick Check",
            subtitle: "Test your basic formula knowledge",
            color: "blue",
            icon: CheckCircle,
            type: "mini-quiz",
        },
        {
            id: 3,
            title: "Heron's Formula",
            subtitle: "Using all three sides",
            color: "green",
            icon: Calculator,
            type: "concept",
        },
        {
            id: 4,
            title: "Practice Time",
            subtitle: "Apply Heron's formula",
            color: "yellow",
            icon: CheckCircle,
            type: "mini-quiz",
        },
        {
            id: 5,
            title: "Trigonometric Formula",
            subtitle: "Area = ½ab sin(C)",
            color: "orange",
            icon: Ruler,
            type: "concept",
        },
        {
            id: 6,
            title: "Coordinate Geometry",
            subtitle: "Using vertex coordinates",
            color: "purple",
            icon: MapPin,
            type: "concept",
        },
        {
            id: 7,
            title: "Drag & Learn",
            subtitle: "Interactive coordinate practice",
            color: "blue",
            icon: CheckCircle,
            type: "mini-quiz",
        },
        {
            id: 8,
            title: "Special Cases",
            subtitle: "Equilateral & Right triangles",
            color: "green",
            icon: Triangle,
            type: "concept",
        },
        {
            id: 9,
            title: "Real-Life Applications",
            subtitle: "Practical uses of triangle area",
            color: "yellow",
            icon: MapPin,
            type: "concept",
        },
        {
            id: 10,
            title: "Final Challenge",
            subtitle: "Master all concepts",
            color: "orange",
            icon: Play,
            type: "quiz",
        },
    ]

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length)
            }, 6000) // Increased time for better interaction
            return () => clearInterval(interval)
        }
    }, [isPlaying, slides.length])

    useEffect(() => {
        setAnimationStep(0)
        const timer = setTimeout(() => setAnimationStep(1), 300)
        const timer2 = setTimeout(() => setAnimationStep(2), 800)
        const timer3 = setTimeout(() => setAnimationStep(3), 1300)
        return () => {
            clearTimeout(timer)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [currentSlide])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const handleQuizAnswer = (questionId, selectedAnswer, correctAnswer) => {
        const isCorrect = selectedAnswer === correctAnswer
        setQuizAnswers((prev) => ({ ...prev, [questionId]: selectedAnswer }))
        setShowFeedback((prev) => ({ ...prev, [questionId]: isCorrect }))

        if (isCorrect) {
            setScore((prev) => prev + 1)
        }
    }

    const handleMouseDown = (point, e) => {
        setIsDragging(point)
        e.preventDefault()
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            setCoordinates((prev) => ({
                ...prev,
                [isDragging]: { x: Math.max(60, Math.min(240, x)), y: Math.max(60, Math.min(190, y)) },
            }))
        }
    }

    const handleMouseUp = () => {
        setIsDragging(null)
    }

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDragging) {
                const svgElement = document.querySelector(".coordinate-svg")
                if (svgElement) {
                    const rect = svgElement.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top

                    setCoordinates((prev) => ({
                        ...prev,
                        [isDragging]: { x: Math.max(60, Math.min(240, x)), y: Math.max(60, Math.min(190, y)) },
                    }))
                }
            }
        }

        const handleGlobalMouseUp = () => {
            setIsDragging(null)
        }

        if (isDragging) {
            document.addEventListener("mousemove", handleGlobalMouseMove)
            document.addEventListener("mouseup", handleGlobalMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleGlobalMouseMove)
            document.removeEventListener("mouseup", handleGlobalMouseUp)
        }
    }, [isDragging])

    const calculateCoordinateArea = () => {
        const { A, B, C } = coordinates
        // Convert SVG coordinates to mathematical coordinates
        const x1 = (A.x - 50) / 20,
            y1 = (200 - A.y) / 20
        const x2 = (B.x - 50) / 20,
            y2 = (200 - B.y) / 20
        const x3 = (C.x - 50) / 20,
            y3 = (200 - B.y) / 20

        const area = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
        return area.toFixed(1)
    }

    const basicArea = (base * height) / 2
    const s = (sideA + sideB + sideC) / 2
    const heronsArea = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC))
    const trigArea = (sideA * sideB * Math.sin((angle * Math.PI) / 180)) / 2

    const renderSlideContent = () => {
        const slide = slides[currentSlide]

        switch (currentSlide) {
            case 0: // Basic Formula
                return (
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                        <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
                            <div
                                className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50 transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-lg lg:text-2xl font-bold text-purple-400 mb-2 lg:mb-4">The Foundation Formula</h3>
                                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                                    Every triangle's area can be found using its base and height. Think of it as half of a rectangle!
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-purple-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <div className="text-center">
                                    <div className="text-xl lg:text-3xl font-mono text-purple-400 mb-2 lg:mb-4">
                                        Area = ½ × base × height
                                    </div>
                                    <div className="text-lg lg:text-xl text-gray-400">A = ½bh</div>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50 space-y-3 lg:space-y-4 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                            >
                                <div>
                                    <label className="block text-xs lg:text-sm font-medium text-gray-300 mb-2">Base: {base} units</label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="15"
                                        value={base}
                                        onChange={(e) => setBase(Number(e.target.value))}
                                        className="w-full h-2 lg:h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-purple"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs lg:text-sm font-medium text-gray-300 mb-2">
                                        Height: {height} units
                                    </label>
                                    <input
                                        type="range"
                                        min="2"
                                        max="12"
                                        value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                        className="w-full h-2 lg:h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-purple"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center order-1 lg:order-2 min-h-[200px] lg:min-h-[300px]">
                            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50 w-full max-w-sm lg:max-w-md">
                                <svg
                                    width="100%"
                                    height="auto"
                                    viewBox="0 0 300 250"
                                    className="overflow-visible w-full h-auto"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    {/* Rectangle outline (shows how triangle is half of rectangle) */}
                                    <rect
                                        x="50"
                                        y={200 - height * 10}
                                        width={base * 15}
                                        height={height * 10}
                                        fill="none"
                                        stroke="rgba(168, 85, 247, 0.3)"
                                        strokeDasharray="5,5"
                                        className={`transition-all duration-1000 ${animationStep >= 1 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Triangle */}
                                    <polygon
                                        points={`50,200 ${50 + base * 15},200 ${50 + (base * 15) / 2},${200 - height * 10}`}
                                        fill={`rgba(168, 85, 247, ${animationStep >= 2 ? 0.3 : 0})`}
                                        stroke="#a855f7"
                                        strokeWidth="2"
                                        className={`transition-all duration-1000 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Base line */}
                                    <line
                                        x1="50"
                                        y1="210"
                                        x2={50 + base * 15}
                                        y2="210"
                                        stroke="#a855f7"
                                        strokeWidth="3"
                                        className={`transition-all duration-700 delay-500 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <text
                                        x={50 + (base * 15) / 2}
                                        y="225"
                                        textAnchor="middle"
                                        fill="#a855f7"
                                        fontSize="16"
                                        fontWeight="bold"
                                    >
                                        base = {base}
                                    </text>

                                    {/* Height line */}
                                    <line
                                        x1={50 + (base * 15) / 2}
                                        y1="200"
                                        x2={50 + (base * 15) / 2}
                                        y2={200 - height * 10}
                                        stroke="#a855f7"
                                        strokeWidth="3"
                                        strokeDasharray="3,3"
                                        className={`transition-all duration-700 delay-700 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <text
                                        x={50 + (base * 15) / 2 + 20}
                                        y={200 - (height * 10) / 2}
                                        fill="#a855f7"
                                        fontSize="16"
                                        fontWeight="bold"
                                    >
                                        height = {height}
                                    </text>
                                </svg>

                                <div
                                    className={`mt-4 lg:mt-6 text-center transform transition-all duration-700 delay-1000 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <div className="text-xl lg:text-2xl font-bold text-purple-400">
                                        Area = {basicArea.toFixed(1)} square units
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 1: // Mini-quiz for basic formula
                return (
                    <div className="grid px-20 py-10 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                        <div className="space-y-4 lg:space-y-6">
                            <div
                                className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50 transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-xl lg:text-2xl font-bold text-blue-400 mb-3 lg:mb-4">Quick Practice</h3>
                                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                                    Let's test your understanding of the basic formula!
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-blue-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <h4 className="text-blue-400 font-semibold mb-3 lg:mb-4">Question:</h4>
                                <p className="text-gray-300 text-sm lg:text-base mb-3 lg:mb-4">
                                    A triangle has a base of 12 units and height of 8 units. What is its area?
                                </p>
                                <div className="space-y-2">
                                    {[
                                        { text: "A) 96 square units", value: "A", correct: false },
                                        { text: "B) 48 square units", value: "B", correct: true },
                                        { text: "C) 20 square units", value: "C", correct: false },
                                        { text: "D) 24 square units", value: "D", correct: false },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleQuizAnswer("basic1", option.value, "B")}
                                            className={`w-full p-3 text-left rounded-lg transition-all duration-300 ${quizAnswers["basic1"] === option.value
                                                ? showFeedback["basic1"]
                                                    ? "bg-green-600 text-white"
                                                    : "bg-red-600 text-white"
                                                : "bg-slate-700/80 hover:bg-slate-600/80 text-gray-200 hover:text-white border border-slate-600/50"
                                                }`}
                                            disabled={quizAnswers["basic1"]}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{option.text}</span>
                                                {quizAnswers["basic1"] === option.value &&
                                                    (showFeedback["basic1"] ? (
                                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-red-300" />
                                                    ))}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {quizAnswers["basic1"] && (
                                    <div
                                        className={`mt-4 p-3 rounded-lg ${showFeedback["basic1"] ? "bg-green-900/50" : "bg-red-900/50"}`}
                                    >
                                        <p className="text-sm">
                                            {showFeedback["basic1"]
                                                ? "Correct! Area = ½ × 12 × 8 = 48 square units"
                                                : "Not quite. Remember: Area = ½ × base × height = ½ × 12 × 8 = 48"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50">
                                <svg width="100%" height="auto" viewBox="0 0 300 250" className="w-full max-w-sm">
                                    <polygon
                                        points="50,200 230,200 140,80"
                                        fill="rgba(96, 165, 250, 0.3)"
                                        stroke="#60a5fa"
                                        strokeWidth="3"
                                        className={`transition-all duration-1000 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <text x="140" y="220" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">
                                        base = 12
                                    </text>
                                    <text x="160" y="140" fill="#60a5fa" fontSize="16" fontWeight="bold">
                                        height = 8
                                    </text>
                                    <line x1="140" y1="200" x2="140" y2="80" stroke="#60a5fa" strokeWidth="2" strokeDasharray="3,3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )

            case 2: // Heron's Formula
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-green-400 mb-4">When You Know All Sides</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Heron's formula is perfect when you only know the three side lengths. No height needed!
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-green-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <div className="text-center space-y-3">
                                    <div className="text-lg font-mono text-green-400">Step 1: s = (a + b + c) ÷ 2</div>
                                    <div className="text-2xl font-mono text-green-400">Step 2: Area = √[s(s-a)(s-b)(s-c)]</div>
                                </div>
                            </div>

                            <div
                                className={`space-y-4 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Side A: {sideA} units</label>
                                    <input
                                        type="range"
                                        min="2"
                                        max="12"
                                        value={sideA}
                                        onChange={(e) => setSideA(Number(e.target.value))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Side B: {sideB} units</label>
                                    <input
                                        type="range"
                                        min="2"
                                        max="12"
                                        value={sideB}
                                        onChange={(e) => setSideB(Number(e.target.value))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Side C: {sideC} units</label>
                                    <input
                                        type="range"
                                        min="2"
                                        max="12"
                                        value={sideC}
                                        onChange={(e) => setSideC(Number(e.target.value))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-green"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <svg width="300" height="250" viewBox="0 0 300 250">
                                    {/* Triangle with all sides labeled */}
                                    <polygon
                                        points="150,50 80,180 220,180"
                                        fill={`rgba(34, 197, 94, ${animationStep >= 2 ? 0.3 : 0})`}
                                        stroke="#22c55e"
                                        strokeWidth="3"
                                        className={`transition-all duration-1000 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Side labels */}
                                    <text x="110" y="40" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">
                                        a = {sideA}
                                    </text>
                                    <text x="40" y="120" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">
                                        b = {sideB}
                                    </text>
                                    <text x="150" y="200" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">
                                        c = {sideC}
                                    </text>
                                </svg>

                                <div
                                    className={`mt-6 space-y-3 transform transition-all duration-700 delay-700 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">Semi-perimeter:</div>
                                        <div className="text-lg text-green-400">s = {s.toFixed(1)}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">
                                            {isNaN(heronsArea) ? "Invalid triangle!" : `Area = ${heronsArea.toFixed(1)} sq units`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 3: // Trigonometric Formula
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Using Angles & Sides</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    When you know two sides and the angle between them, trigonometry comes to the rescue!
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-yellow-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-mono text-yellow-400 mb-4">Area = ½ab sin(C)</div>
                                    <div className="text-gray-400">Where C is the angle between sides a and b</div>
                                </div>
                            </div>

                            <div
                                className={`space-y-4 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Side A: {sideA} units</label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="10"
                                        value={sideA}
                                        onChange={(e) => setSideA(Number(e.target.value))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-yellow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Side B: {sideB} units</label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="10"
                                        value={sideB}
                                        onChange={(e) => setSideB(Number(e.target.value))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-yellow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Angle C: {angle}°</label>
                                    <input
                                        type="range"
                                        min="30"
                                        max="150"
                                        value={angle}
                                        onChange={(e) => setAngle(Number(e.target.value))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-yellow"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <svg width="300" height="250" viewBox="0 0 300 250">
                                    {/* Dynamic triangle based on angle */}
                                    <polygon
                                        points={`150,50 ${150 - sideA * 15},180 ${150 + sideB * 15 * Math.cos((angle * Math.PI) / 180)},${180 - sideB * 15 * Math.sin((angle * Math.PI) / 180)}`}
                                        fill={`rgba(251, 191, 36, ${animationStep >= 2 ? 0.3 : 0})`}
                                        stroke="#f59e0b"
                                        strokeWidth="3"
                                        className={`transition-all duration-1000 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Angle arc */}
                                    <path
                                        d={`M ${150 - 30} 180 A 30 30 0 0 0 ${150 + 30 * Math.cos((angle * Math.PI) / 180)} ${180 - 30 * Math.sin((angle * Math.PI) / 180)}`}
                                        fill="none"
                                        stroke="#f59e0b"
                                        strokeWidth="2"
                                        className={`transition-all duration-700 delay-500 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Labels */}
                                    <text x="100" y="200" fill="#f59e0b" fontSize="14" fontWeight="bold">
                                        a = {sideA}
                                    </text>
                                    <text x="200" y="200" fill="#f59e0b" fontSize="14" fontWeight="bold">
                                        b = {sideB}
                                    </text>
                                    <text x="160" y="195" fill="#f59e0b" fontSize="14" fontWeight="bold">
                                        {angle}°
                                    </text>
                                </svg>

                                <div
                                    className={`mt-6 text-center transform transition-all duration-700 delay-1000 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <div className="text-2xl font-bold text-yellow-400">Area = {trigArea.toFixed(1)} square units</div>
                                    <div className="text-sm text-gray-400 mt-2">
                                        sin({angle}°) = {Math.sin((angle * Math.PI) / 180).toFixed(3)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 4: // Coordinate Geometry
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">Using Coordinates</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    When you have the coordinates of the three vertices, use this powerful formula!
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-purple-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <div className="text-center">
                                    <div className="text-lg font-mono text-purple-400 mb-2">
                                        Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|
                                    </div>
                                    <div className="text-gray-400">For vertices A(x₁,y₁), B(x₂,y₂), C(x₃,y₃)</div>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-4 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                            >
                                <h4 className="text-purple-400 font-semibold mb-3">Example Calculation:</h4>
                                <div className="space-y-2 text-sm font-mono">
                                    <div>A(2, 1), B(6, 4), C(4, 7)</div>
                                    <div className="text-purple-400">= ½|2(4-7) + 6(7-1) + 4(1-4)|</div>
                                    <div className="text-purple-400">= ½|2(-3) + 6(6) + 4(-3)|</div>
                                    <div className="text-purple-400">= ½|-6 + 36 - 12|</div>
                                    <div className="text-purple-400">= ½|18| = 9 square units</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <svg width="300" height="250" viewBox="0 0 300 250">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        width="300"
                                        height="250"
                                        fill="url(#grid)"
                                        className={`transition-opacity duration-700 ${animationStep >= 1 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Axes */}
                                    <line
                                        x1="50"
                                        y1="200"
                                        x2="250"
                                        y2="200"
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        className={`transition-opacity duration-700 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <line
                                        x1="50"
                                        y1="50"
                                        x2="50"
                                        y2="200"
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        className={`transition-opacity duration-700 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Triangle */}
                                    <polygon
                                        points="90,180 170,120 130,80"
                                        fill={`rgba(34, 197, 94, ${animationStep >= 3 ? 0.3 : 0})`}
                                        stroke="#22c55e"
                                        strokeWidth="3"
                                        className={`transition-all duration-1000 delay-500 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Points */}
                                    <circle
                                        cx="90"
                                        cy="180"
                                        r="4"
                                        fill="#22c55e"
                                        className={`transition-all duration-500 delay-700 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <circle
                                        cx="170"
                                        cy="120"
                                        r="4"
                                        fill="#22c55e"
                                        className={`transition-all duration-500 delay-800 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <circle
                                        cx="130"
                                        cy="80"
                                        r="4"
                                        fill="#22c55e"
                                        className={`transition-all duration-500 delay-900 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Labels */}
                                    <text x="85" y="195" fill="#22c55e" fontSize="12" fontWeight="bold">
                                        A(2,1)
                                    </text>
                                    <text x="175" y="115" fill="#22c55e" fontSize="12" fontWeight="bold">
                                        B(6,4)
                                    </text>
                                    <text x="135" y="75" fill="#22c55e" fontSize="12" fontWeight="bold">
                                        C(4,7)
                                    </text>
                                </svg>

                                <div
                                    className={`mt-6 text-center transform transition-all duration-700 delay-1000 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <div className="text-2xl font-bold text-green-400">Area = 9 square units</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 5: // Interactive Coordinate Geometry with draggable points
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-green-400 mb-4">Drag the Points!</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Move the triangle vertices and watch the area change in real-time using coordinate geometry.
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-green-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <div className="text-center">
                                    <div className="text-lg font-mono text-green-400 mb-2">
                                        Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|
                                    </div>
                                    <div className="text-gray-400">Drag the vertices to change coordinates</div>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-4 text-gray-300 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                            >
                                <h4 className="text-green-400 font-semibold mb-3">Current Coordinates:</h4>
                                <div className="space-y-2 text-sm font-mono">
                                    <div>
                                        A({((coordinates.A.x - 50) / 20).toFixed(1)}, {((200 - coordinates.A.y) / 20).toFixed(1)})
                                    </div>
                                    <div>
                                        B({((coordinates.B.x - 50) / 20).toFixed(1)}, {((200 - coordinates.B.y) / 20).toFixed(1)})
                                    </div>
                                    <div>
                                        C({((coordinates.C.x - 50) / 20).toFixed(1)}, {((200 - coordinates.C.y) / 20).toFixed(1)})
                                    </div>
                                    <div className="text-green-400 font-bold">Area = {calculateCoordinateArea()} square units</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="300"
                                    height="250"
                                    viewBox="0 0 300 250"
                                    className="coordinate-svg border border-slate-600 rounded-lg bg-slate-800/50"
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                >
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="1" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        width="300"
                                        height="250"
                                        fill="url(#grid)"
                                        className={`transition-opacity duration-700 ${animationStep >= 1 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Axes */}
                                    <line
                                        x1="50"
                                        y1="200"
                                        x2="250"
                                        y2="200"
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        className={`transition-opacity duration-700 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <line
                                        x1="50"
                                        y1="50"
                                        x2="50"
                                        y2="200"
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        className={`transition-opacity duration-700 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Triangle */}
                                    <polygon
                                        points={`${coordinates.A.x},${coordinates.A.y} ${coordinates.B.x},${coordinates.B.y} ${coordinates.C.x},${coordinates.C.y}`}
                                        fill="rgba(34, 197, 94, 0.3)"
                                        stroke="#22c55e"
                                        strokeWidth="3"
                                        className={`transition-all duration-300 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                    />

                                    {/* Draggable Points */}
                                    {Object.entries(coordinates).map(([point, coord]) => (
                                        <g key={point}>
                                            <circle
                                                cx={coord.x}
                                                cy={coord.y}
                                                r="8"
                                                fill="#22c55e"
                                                stroke="#16a34a"
                                                strokeWidth="2"
                                                className={`cursor-grab transition-all duration-300 hover:scale-125 ${isDragging === point ? "cursor-grabbing scale-125" : ""} ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                                onMouseDown={(e) => handleMouseDown(point, e)}
                                            />
                                            <text
                                                x={coord.x + 15}
                                                y={coord.y - 10}
                                                fill="#22c55e"
                                                fontSize="14"
                                                fontWeight="bold"
                                                className="pointer-events-none"
                                            >
                                                {point}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                )

            case 6: // Real-Life Applications
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Real-World Uses</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Triangle area calculations are everywhere in real life! Here are some practical applications.
                                </p>
                            </div>

                            <div
                                className={`space-y-4 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <div className="bg-slate-800 rounded-xl p-4 border border-yellow-500/30">
                                    <h4 className="text-yellow-400 font-semibold mb-2">🏠 Architecture & Construction</h4>
                                    <p className="text-gray-300 text-sm">
                                        Calculating roof areas, triangular windows, and structural supports
                                    </p>
                                </div>

                                <div className="bg-slate-800 rounded-xl p-4 border border-yellow-500/30">
                                    <h4 className="text-yellow-400 font-semibold mb-2">🌾 Land Surveying</h4>
                                    <p className="text-gray-300 text-sm">
                                        Measuring triangular plots of farmland and property boundaries
                                    </p>
                                </div>

                                <div className="bg-slate-800 rounded-xl p-4 border border-yellow-500/30">
                                    <h4 className="text-yellow-400 font-semibold mb-2">⛵ Marine Engineering</h4>
                                    <p className="text-gray-300 text-sm">Designing triangular sails and calculating their surface area</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl p-4 border border-yellow-500/30">
                                    <h4 className="text-yellow-400 font-semibold mb-2">🎨 Art & Design</h4>
                                    <p className="text-gray-300 text-sm">Creating geometric patterns and calculating material needs</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-6">
                                {/* House with triangular roof */}
                                <div
                                    className={`text-center transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <svg width="120" height="100" viewBox="0 0 120 100">
                                        <rect x="20" y="60" width="80" height="35" fill="#64748b" stroke="#475569" strokeWidth="2" />
                                        <polygon points="60,20 10,60 110,60" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                                        <rect x="45" y="70" width="15" height="20" fill="#374151" />
                                        <rect x="70" y="70" width="12" height="12" fill="#fbbf24" />
                                    </svg>
                                    <div className="text-yellow-400 text-sm mt-2">Architecture</div>
                                </div>

                                {/* Sailboat */}
                                <div
                                    className={`text-center transform transition-all duration-700 delay-500 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <svg width="120" height="100" viewBox="0 0 120 100">
                                        <polygon points="60,20 60,80 20,80" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                                        <line x1="60" y1="20" x2="60" y2="85" stroke="#374151" strokeWidth="3" />
                                        <path d="M 10 85 Q 60 75 110 85" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                    </svg>
                                    <div className="text-yellow-400 text-sm mt-2">Marine</div>
                                </div>

                                {/* Farm field */}
                                <div
                                    className={`text-center transform transition-all duration-700 delay-700 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <svg width="120" height="100" viewBox="0 0 120 100">
                                        <polygon points="60,20 20,80 100,80" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
                                        <circle cx="40" cy="60" r="3" fill="#fbbf24" />
                                        <circle cx="70" cy="65" r="3" fill="#fbbf24" />
                                        <circle cx="55" cy="70" r="3" fill="#fbbf24" />
                                    </svg>
                                    <div className="text-yellow-400 text-sm mt-2">Agriculture</div>
                                </div>

                                {/* Art pattern */}
                                <div
                                    className={`text-center transform transition-all duration-700 delay-900 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <svg width="120" height="100" viewBox="0 0 120 100">
                                        <polygon points="60,20 30,60 90,60" fill="#a855f7" stroke="#9333ea" strokeWidth="2" />
                                        <polygon points="60,60 30,80 90,80" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                                        <polygon points="30,60 60,80 30,80" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
                                        <polygon points="90,60 60,80 90,80" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                                    </svg>
                                    <div className="text-yellow-400 text-sm mt-2">Art & Design</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 7: // Interactive Quiz
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-blue-400 mb-4">Test Your Knowledge!</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Let's see how well you understand triangle area calculations with these interactive questions.
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800 text-gray-200 rounded-xl p-6 border border-blue-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <h4 className="text-blue-400 font-semibold mb-4">Question 1:</h4>
                                <p className="text-gray-300 mb-4">
                                    A triangle has a base of 10 units and height of 6 units. What is its area?
                                </p>
                                <div className="space-y-2 font-semibold">
                                    <button className="w-full p-3 text-left bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                        A) 60 square units
                                    </button>
                                    <button className="w-full p-3 text-left bg-slate-700 hover:bg-green-600 rounded-lg transition-colors">
                                        B) 30 square units ✓
                                    </button>
                                    <button className="w-full p-3 text-left bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                        C) 16 square units
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl text-gray-200 p-6 border border-blue-500/30 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <h4 className="text-blue-400 font-semibold mb-4">Question 2:</h4>
                                <p className="text-gray-300 mb-4">Which formula would you use for a triangle with sides 3, 4, and 5?</p>
                                <div className="space-y-2">
                                    <button className="w-full p-3 text-left bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                        A) Basic formula (½bh)
                                    </button>
                                    <button className="w-full p-3 text-left bg-slate-700 hover:bg-green-600 rounded-lg transition-colors">
                                        B) Heron's formula ✓
                                    </button>
                                    <button className="w-full p-3 text-left bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                        C) Trigonometric formula
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-center space-y-8">
                                <div
                                    className={`transform transition-all duration-1000 delay-300 ${animationStep >= 2 ? "rotate-0 opacity-100" : "rotate-12 opacity-0"}`}
                                >
                                    <div className="text-6xl mb-4">🏆</div>
                                    <div className="text-2xl font-bold text-blue-400">Great Job!</div>
                                    <div className="text-gray-300">You're mastering triangle areas!</div>
                                </div>

                                <div
                                    className={`bg-slate-800 rounded-xl p-6 border border-blue-500/30 transform transition-all duration-700 delay-700 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <h4 className="text-blue-400 font-semibold mb-3">Quick Tips:</h4>
                                    <div className="space-y-2 text-sm text-gray-300">
                                        <div>• Always check if sides can form a valid triangle</div>
                                        <div>• Use the right formula for the given information</div>
                                        <div>• Remember: Area is always positive!</div>
                                        <div>• Practice with different triangle types</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 8: // Special Cases
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-green-400 mb-4">Special Triangle Types</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Some triangles have special properties that make area calculation even easier!
                                </p>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-green-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <h4 className="text-green-400 font-semibold mb-4">Equilateral Triangle</h4>
                                <div className="text-center space-y-2">
                                    <div className="text-2xl font-mono text-green-400">Area = (√3/4) × s²</div>
                                    <div className="text-gray-400">Where s is the side length</div>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-green-500/30 transform transition-all duration-700 delay-500 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <h4 className="text-green-400 font-semibold mb-4">Right-Angled Triangle</h4>
                                <div className="text-center space-y-2">
                                    <div className="text-2xl font-mono text-green-400">Area = ½ × base × height</div>
                                    <div className="text-gray-400">The two perpendicular sides are base and height</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="space-y-8">
                                {/* Equilateral Triangle */}
                                <div className="text-center">
                                    <svg width="150" height="130" viewBox="0 0 150 130">
                                        <polygon
                                            points="75,20 25,110 125,110"
                                            fill={`rgba(34, 197, 94, ${animationStep >= 2 ? 0.3 : 0})`}
                                            stroke="#22c55e"
                                            strokeWidth="3"
                                            className={`transition-all duration-1000 delay-300 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
                                        />
                                        <text x="75" y="140" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">
                                            Equilateral
                                        </text>
                                    </svg>
                                </div>

                                {/* Right Triangle */}
                                <div className="text-center">
                                    <svg width="150" height="130" viewBox="0 0 150 130">
                                        <polygon
                                            points="25,110 125,110 25,30"
                                            fill={`rgba(34, 197, 94, ${animationStep >= 3 ? 0.3 : 0})`}
                                            stroke="#22c55e"
                                            strokeWidth="3"
                                            className={`transition-all duration-1000 delay-500 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                        />
                                        {/* Right angle symbol */}
                                        <path
                                            d="M 35 110 L 35 100 L 25 100"
                                            fill="none"
                                            stroke="#22c55e"
                                            strokeWidth="2"
                                            className={`transition-opacity duration-500 delay-700 ${animationStep >= 3 ? "opacity-100" : "opacity-0"}`}
                                        />
                                        <text x="75" y="140" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">
                                            Right-Angled
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 9: // Enhanced Final Challenge Quiz
                return (
                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <div
                                className={`transform transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                            >
                                <h3 className="text-2xl font-bold text-orange-400 mb-4">Final Challenge!</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Test all your triangle area knowledge with these comprehensive questions.
                                </p>
                                <div className="text-center">
                                    <div className="text-lg text-orange-400">
                                        Score: {score} / {Object.keys(quizAnswers).length}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800 rounded-xl p-6 border border-orange-500/30 transform transition-all duration-700 delay-300 ${animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            >
                                <h4 className="text-orange-400 font-semibold mb-4">Challenge Question:</h4>
                                <p className="text-gray-300 mb-4">
                                    A triangle has vertices at A(0,0), B(4,0), and C(2,3). What is its area?
                                </p>
                                <div className="space-y-2">
                                    {[
                                        { text: "A) 12 square units", value: "A", correct: false },
                                        { text: "B) 6 square units", value: "B", correct: true },
                                        { text: "C) 9 square units", value: "C", correct: false },
                                        { text: "D) 3 square units", value: "D", correct: false },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleQuizAnswer("final1", option.value, "B")}
                                            className={`w-full p-3 text-left rounded-lg transition-all duration-300 ${quizAnswers["final1"] === option.value
                                                ? showFeedback["final1"]
                                                    ? "bg-green-600 text-white"
                                                    : "bg-red-600 text-white"
                                                : "bg-slate-700/80 hover:bg-slate-600/80 text-gray-200 hover:text-white border border-slate-600/50"
                                                }`}
                                            disabled={quizAnswers["final1"]}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{option.text}</span>
                                                {quizAnswers["final1"] === option.value &&
                                                    (showFeedback["final1"] ? (
                                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-red-300" />
                                                    ))}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {quizAnswers["final1"] && (
                                    <div
                                        className={`mt-4 p-3 rounded-lg ${showFeedback["final1"] ? "bg-green-900/50" : "bg-red-900/50"}`}
                                    >
                                        <p className="text-sm">
                                            {showFeedback["final1"]
                                                ? "Perfect! Using coordinate formula: Area = ½|0(0-3) + 4(3-0) + 2(0-0)| = ½|12| = 6"
                                                : "Try again! Use the coordinate geometry formula with the given points."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-center space-y-8">
                                <div
                                    className={`transform transition-all duration-1000 delay-300 ${animationStep >= 2 ? "rotate-0 opacity-100" : "rotate-12 opacity-0"}`}
                                >
                                    <div className="text-6xl mb-4">🏆</div>
                                    <div className="text-2xl font-bold text-orange-400">Triangle Master!</div>
                                    <div className="text-gray-300">You've learned all the formulas!</div>
                                </div>

                                <div
                                    className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 transform transition-all duration-700 delay-700 ${animationStep >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                                >
                                    <h4 className="text-orange-400 font-semibold mb-3">Mastery Checklist:</h4>
                                    <div className="space-y-2 text-sm text-gray-200">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            Basic Formula (½bh)
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            Heron's Formula
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            Trigonometric Formula
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            Coordinate Geometry
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            Real-world Applications
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.5);
                    border-radius: 4px;
                    transition: background 0.2s;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.7);
                }
            `}</style>

            {/* Left Navigation Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-slate-800/90 hover:bg-slate-700/90 rounded-full border border-slate-600 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
                <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Right Navigation Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-slate-800/90 hover:bg-slate-700/90 rounded-full border border-slate-600 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
                <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Main Content */}
            <div className="w-full h-full p-3 lg:p-6 pt-12 pb-16">
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${slides[currentSlide].color === "purple"
                                    ? "bg-purple-500/20 border-purple-500/30"
                                    : slides[currentSlide].color === "blue"
                                        ? "bg-blue-500/20 border-blue-500/30"
                                        : slides[currentSlide].color === "green"
                                            ? "bg-green-500/20 border-green-500/30"
                                            : slides[currentSlide].color === "yellow"
                                                ? "bg-yellow-500/20 border-yellow-500/30"
                                                : "bg-orange-500/20 border-orange-500/30"
                                    }`}
                            >
                                {React.createElement(slides[currentSlide].icon, {
                                    className: `w-4 h-4 ${slides[currentSlide].color === "purple"
                                        ? "text-purple-400"
                                        : slides[currentSlide].color === "blue"
                                            ? "text-blue-400"
                                            : slides[currentSlide].color === "green"
                                                ? "text-green-400"
                                                : slides[currentSlide].color === "yellow"
                                                    ? "text-yellow-400"
                                                    : "text-orange-400"
                                        }`,
                                })}
                                <span
                                    className={`font-semibold text-sm ${slides[currentSlide].color === "purple"
                                        ? "text-purple-400"
                                        : slides[currentSlide].color === "blue"
                                            ? "text-blue-400"
                                            : slides[currentSlide].color === "green"
                                                ? "text-green-400"
                                                : slides[currentSlide].color === "yellow"
                                                    ? "text-yellow-400"
                                                    : "text-orange-400"
                                        }`}
                                >
                                    {currentSlide + 1} of {slides.length}
                                </span>
                            </div>
                            <div>
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${slides[currentSlide].color === "purple"
                                        ? "text-purple-400"
                                        : slides[currentSlide].color === "blue"
                                            ? "text-blue-400"
                                            : slides[currentSlide].color === "green"
                                                ? "text-green-400"
                                                : slides[currentSlide].color === "yellow"
                                                    ? "text-yellow-400"
                                                    : "text-orange-400"
                                        }`}
                                >
                                    {slides[currentSlide].title}
                                </h2>
                                <p className="text-sm text-gray-400">{slides[currentSlide].subtitle}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0">
                        <div className="h-full bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                            <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                                <div className="h-full">{renderSlideContent()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-700/50">
                    <div className="flex gap-1.5">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? slides[currentSlide].color === "purple"
                                        ? "bg-purple-400 scale-125"
                                        : slides[currentSlide].color === "blue"
                                            ? "bg-blue-400 scale-125"
                                            : slides[currentSlide].color === "green"
                                                ? "bg-green-400 scale-125"
                                                : slides[currentSlide].color === "yellow"
                                                    ? "bg-yellow-400 scale-125"
                                                    : "bg-orange-400 scale-125"
                                    : "bg-gray-600 hover:bg-gray-500"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
