/**
 * Enum for canvas context commands
 * @readonly
 * @enum {string}
 */
const ctxCommands = {
    beginPath: "beginPath",
    closePath: "closePath",
    lineTo: "lineTo",
    moveTo: "moveTo",
    stroke: "stroke",
    clear: "clear"
}

/**
 * @typedef {Object[]} Commands
 * @property {@link ctxCommands} command
 * @property {number[]} args
*/

/**
 * Return the command required for drawing a line
 * @param {number} startX Line starting X coordinate
 * @param {number} startY Line starting Y coordinate
 * @param {number} endX Line ending X coordinate
 * @param {number} endY Line ending Y coordinate
 * @returns {Commands} command to draw a line
 */
function drawLine(startX, startY, endX, endY) {
    return [
        { command: ctxCommands.beginPath, args: [] },
        { command: ctxCommands.moveTo, args: [startX, startY] },
        { command: ctxCommands.lineTo, args: [endX, endY] },
        { command: ctxCommands.stroke, args: [] },
        { command: ctxCommands.closePath, args: [] }
    ]
}

/**
 * Create animation for drawing a line
 * @param {number} startX Line starting X coordinate
 * @param {number} startY Line starting Y coordinate
 * @param {number} endX Line ending X coordinate
 * @param {number} endY Line ending Y coordinate
 * @param {number} frames How many frames drawing the line should take
 * @returns {Commands[]} finalFrames
 */
function animateDrawLine(startX, startY, endX, endY, frames) {
    const finalFrames = [];
    const xStep = (endX - startX) / frames;
    const yStep = (endY - startY) / frames;
    for (let index = 0; index < frames; index++) {
        finalFrames.push(
            drawLine(
                startX,
                startY,
                startX + (index * Math.round(xStep)),
                startY + (index * Math.round(yStep))
            )
        );
    }
    return finalFrames
}

/**
 * @typedef {Object} MergeFrames
 * @property {number} start Frame where inserting the frames should start
 * @property {Commands[]} frames Frames to insert
 * @property {Commands} final Final frames to insert into each frames
 */

/**
 *  Merge multiple frames to an animation
 * @param {Commands[]} animation Animation merging to
 * @param {...MergeFrames} frames Frames to merge to the animation
 * @returns {Commands[]} mergedAnimation
*/
function mergeFrames(animation, ...frames) {
    const frameInsert = {};
    frames.forEach(frame => {
        frameInsert[frame.start] = frame
    });
    for (let index = 0; index < animation.length; index++) {
        const commands = animation[index];
        Object.entries(frameInsert).forEach(([key, frame]) => {
            const keyInt = parseInt(key);
            if (index >= keyInt) {
                if (index >= (keyInt + frame.frames.length)) {
                    commands.push(...frame.final);
                } else {
                    commands.push(...frame.frames[index - keyInt]);
                }
            }
        })
    }
    return animation;
}

function drawAxes() {
    const animation = Array.from({ length: 100 }, () => ([{ command: ctxCommands.clear, args: [] }]))
    return mergeFrames(
        animation,
        { start: 1, frames: animateDrawLine(490, 290, 5, 290, 30), final: drawLine(5, 290, 490, 290) },
        { start: 10, frames: animateDrawLine(5, 5, 5, 290, 20), final: drawLine(5, 5, 5, 290) }
    );
}

/**
 * One frame animation, start with clearing the canvas and draw the current frame objects.
 * Requests a new frame and either draw the next frame or start over from the beginning
 * @param {Object} canvas HTML Canvas Object
 * @param {Object} ctx Canvas 2D Context
 * @param {number} idx Current frame
 * @param {Commands[]} canvasObjects All frames of the animations
 */
function animationStep(canvas, ctx, idx, canvasObjects) {
    const currentObjects = canvasObjects[idx];
    currentObjects.forEach(({ command, args }) => {
        switch (command) {
            case ctxCommands.beginPath:
                ctx.beginPath();
                break;
            case ctxCommands.closePath:
                ctx.closePath();
                break;
            case ctxCommands.stroke:
                ctx.stroke();
                break;
            case ctxCommands.moveTo:
                ctx.moveTo(...args);
                break;
            case ctxCommands.lineTo:
                ctx.lineTo(...args);
                break;
            case ctxCommands.clear:
                ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                break;
            default:
                break;
        }
    })

    if (idx + 1 < canvasObjects.length) {
        requestAnimationFrame(() => animationStep(canvas, ctx, idx + 1, canvasObjects));
    } else {
        requestAnimationFrame(() => animationStep(canvas, ctx, 0, canvasObjects));
    }
}

function animateCanvas(canvasId, canvasObjects) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    requestAnimationFrame(() => animationStep(canvas, ctx, 0, canvasObjects));
}