import Vector2 from "./vector2.js"

class Input
{
  constructor(element)
  {
    this.targetElement = element;
    this.oldHeldKeys = [];
    this.heldKeys = [];
    this.oldHeldMouseButtons = [];
    this.heldMouseButtons = [];
    
    this.oldMouse = new Vector2();
    this.mouse = new Vector2();

    element.addEventListener("keydown", (e) => this.onkeydown(e));
    element.addEventListener("keyup", (e) => this.onkeyup(e));
    element.addEventListener("mousedown", (e) => this.onmousedown(e));
    window.addEventListener("mouseup", (e) => this.onmouseup(e));
    window.addEventListener("mousemove", (e) => this.onmousemove(e));
    element.addEventListener("contextmenu", (e) => e.preventDefault());
    element.addEventListener("focusout", () => this.onfocusout());
    element.tabIndex = 1;
  }

  update()
  {
    this.oldHeldKeys = this.heldKeys.slice(0);
    this.oldHeldMouseButtons = this.heldMouseButtons.slice(0);
    this.oldMouse.x = this.mouse.x;
    this.oldMouse.y = this.mouse.y;
  }

  getMousePosition()
  {
    return new Vector2(this.mouse.x, this.mouse.y);
  }

  getMouseDisplacement()
  {
    return this.oldMouse.subtract(this.mouse);
  }

  isKeyDown(keyCode)
  {
    return this.heldKeys.includes(keyCode);
  }

  isKeyUp(keyCode)
  {
    return !this.heldKeys.includes(keyCode);
  }

  wasKeyTapped(keyCode)
  {
    return this.heldKeys.includes(keyCode) &&
           !this.oldHeldKeys.includes(keyCode);
  }

  isButtonDown(button)
  {
    return this.heldMouseButtons.includes(button);
  }

  isButtonUp(button)
  {
    return !this.heldMouseButtons.includes(button);
  }

  wasButtonTapped(button)
  {
    return this.heldMouseButtons.includes(button) &&
           !this.oldHeldMouseButtons.includes(button);
  }

  // event handlers

  onkeydown(e)
  {
    if(!this.heldKeys.includes(e.keyCode))
      this.heldKeys.push(e.keyCode);
  }

  onkeyup(e)
  {
    let index = this.heldKeys.indexOf(e.keyCode);
    this.heldKeys.splice(index, 1);
    e.preventDefault();
  }

  onmousedown(e)
  {
    if(!this.heldMouseButtons.includes(e.button))
      this.heldMouseButtons.push(e.button);

    this.targetElement.focus();
    e.preventDefault();
  }

  onmouseup(e)
  {
    let index = this.heldMouseButtons.indexOf(e.button);
    this.heldMouseButtons.splice(index, 1);
  }

  onmousemove(e)
  {
    let bounds = this.targetElement.getBoundingClientRect()
    this.mouse.x = e.clientX - bounds.left;
    this.mouse.y = e.clientY - bounds.top;
  }

  onfocusout()
  {
    this.heldKeys = [];
    this.heldMouseButtons = [];
  }
}

export default Input;