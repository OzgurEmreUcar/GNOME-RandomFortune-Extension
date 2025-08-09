// Import necessary GNOME libraries
const { St, Clutter, GLib } = imports.gi;
const Main = imports.ui.main;

let label; // Will hold reference to the panel button

function init() {
    // Initialization logic if needed (not used in this case)
}

function enable() {
    // Create a new label with an emoji as the button text
    label = new St.Label({
        text: '🔮',
        y_align: Clutter.ActorAlign.CENTER, // Vertically center the label in the panel
    });

    label.reactive = true;         // Make the label respond to mouse clicks
    label.track_hover = true;      // Enable hover behavior (useful for styling effects)
    label.add_style_class_name('panel-button'); // Use default panel button styling

    // Connect a click event to the label
    label.connect('button-press-event', () => {
        // Run the fortune command and save the output to a file asynchronously
        GLib.spawn_command_line_async('bash -c "fortune > ~/.fortune_today.txt"');
        // You can optionally add a notification here to inform the user
    });

    // Add the label to the right side of the GNOME top panel
    Main.panel._rightBox.insert_child_at_index(label, 0);
}

function disable() {
    // Remove the label from the panel when the extension is disabled
    if (label) {
        label.destroy();
        label = null;
    }
}
