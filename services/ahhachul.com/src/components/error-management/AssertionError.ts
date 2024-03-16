export class AssertionError extends Error {
  static assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
      throw new AssertionError(message);
    }
  }
}

export const useErrorBoundary_this_hook_should_be_called_in_ErrorBoundary_props_children =
  'useErrorBoundary: this hook should be called in ErrorBoundary.props.children';

export const useErrorBoundaryGroup_this_hook_should_be_called_in_ErrorBoundary_props_children =
  'useErrorBoundaryGroup: this hook should be called in ErrorBoundary.props.children';
